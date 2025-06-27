import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isUserAuthenticated } from './utils/validations';
import { Routes } from './utils/types/routes';
import { Roles } from './utils/types/roles';
import { AVAILABLE_LANGUAGES, Language } from '@/utils/types/languages';

/* 
* - All Valid Routes 
* these routes are the only routes accessable from user or admin
* they change based on the features added
*/
const validRoutes = Object.values(Routes);

/* protected routes for non authenticated users - non authenticated users can not access these routes */
const protectedRoutesForNonAuth = [Routes.admin];

/* 
* protected routes for authenticated users - authenticated users can not access these routes 
* admin route is accessable only for admin users
* login route is accessable only for non authenticated users
*/
const protectedRoutesForAuth = [Routes.admin, Routes.login];

/* 
* public routes - these routes are accessable for all users
* they change based on the features added
*/
const publicRoutes = [Routes.home, Routes.feedback];


export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const currentLang = path.split('/')[1];

    try {
        // Skip language check for static files and API routes
        if (path.startsWith('/_next') || path.startsWith('/api')) {
            return NextResponse.next({ request });
        }

        // Handle language routing first
        const pathnameHasLanguage = AVAILABLE_LANGUAGES.includes(currentLang as Language);

        if (!pathnameHasLanguage) {
            const preferredLanguage = request.headers.get('accept-language')?.split(',')[0].split('-')[0] || 'en';
            const language = AVAILABLE_LANGUAGES.includes(preferredLanguage as Language) ? preferredLanguage : 'en';
            return NextResponse.redirect(new URL(`/${language}${path === '/' ? '' : path}`, request.url));
        }

        // Remove language prefix for route validation
        const pathWithoutLang = path.replace(/^\/[a-z]{2}/, '') || '/';

        // check if the route is valid
        if (!isValidRoute(pathWithoutLang)) {
            return NextResponse.redirect(new URL(`/${currentLang}${Routes.home}`, request.url))
        }

        // skip auth check for public routes
        if (publicRoutes.includes(pathWithoutLang as Routes)) {
            return NextResponse.next({ request })
        }

        // check authentication
        const { data } = await isUserAuthenticated();
        const role = data?.role;

        // check if unauthenticated users trying to access a protected route
        if (!data) {
            if (isProtectedRoute(pathWithoutLang, protectedRoutesForNonAuth)) {
                return NextResponse.redirect(new URL(`/${currentLang}${Routes.login}`, request.url))
            }
            return NextResponse.next({ request });
        }

        // check if authenticated users trying to access protected routes
        if (isProtectedRoute(pathWithoutLang, protectedRoutesForAuth)) {
            const isAdmin = role === Roles.admin;
            if (pathWithoutLang.startsWith(Routes.admin)) {
                if (!isAdmin) {
                    return NextResponse.redirect(new URL(`/${currentLang}${Routes.home}`, request.url))
                }
                // If admin, redirect to /admin without language prefix
                return NextResponse.redirect(new URL(Routes.admin, request.url))
            }
            if (pathWithoutLang.startsWith(Routes.login)) {
                // If admin user is logging in, redirect to /admin
                if (isAdmin) {
                    return NextResponse.redirect(new URL(Routes.admin, request.url))
                }
                return NextResponse.redirect(new URL(`/${currentLang}${Routes.home}`, request.url))
            }
        }

        return NextResponse.next({ request });
    } catch (error: unknown) {
        console.log("middleware Error > catch block: ", error);
        return NextResponse.redirect(new URL(`/${currentLang}${Routes.home}`, request.url))
    }
}

const isProtectedRoute = (path: string, routes: string[]): boolean =>
    routes.some(route => path.startsWith(route));

const isValidRoute = (path: string) => {
    // Check if the path matches any valid route
    return validRoutes.some(route => {
        // Handle dynamic routes
        if (route.includes('[') && route.includes(']')) {
            const routePattern = route
                .replace(/\[.*?\]/g, '[^/]+') // Replace [param] with a pattern that matches any non-slash characters
                .replace(/\//g, '\\/'); // Escape forward slashes
            return new RegExp(`^${routePattern}$`).test(path);
        }
        return path === route || path.startsWith(route + '/');
    });
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - logo.svg (svg file)
         * - favicon.ico (favicon file)
         * - public folder
         * - api folder
         */
        '/((?!_next/static|_next/image|logo.svg|favicon.ico|public/|api/).*)',
    ],
};
