import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isUserAuthenticated } from './utils/validations';
import { Routes } from './utils/types/routes';
import { Roles } from './utils/types/roles';

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
const publicRoutes = [Routes.home];


export async function middleware(request: NextRequest) {
    try {
        const path = request.nextUrl.pathname;

        // check if the route is valid
        if (!isValidRoute(path)) {
            return NextResponse.redirect(new URL(Routes.home, request.url))
        }

        // skip auth check for public routes
        if (publicRoutes.includes(path as Routes)) {
            return NextResponse.next({ request })
        }

        // check authentication
        const { data } = await isUserAuthenticated();
        const role = data?.role;

        // check if unauthenticated users trying to access a protected route
        if (!data) { // !success || !!data
            if (isProtectedRoute(path, protectedRoutesForNonAuth)) {
                return NextResponse.redirect(new URL(Routes.login, request.url))
            }

            return NextResponse.next({ request });
        }

        // check if authenticated users trying to access protected routes
        if (isProtectedRoute(path, protectedRoutesForAuth)) {
            const isAdmin = role === Roles.admin;
            if (path.startsWith(Routes.admin) && !isAdmin) {
                return NextResponse.redirect(new URL(Routes.home, request.url))
            }
            if (path.startsWith(Routes.login)) {
                return NextResponse.redirect(new URL(Routes.home, request.url))
            }
        }

        return NextResponse.next({ request })
    } catch (error: unknown) {
        console.log("middleware Error > catch block: ", error);
        // on error allow access to public routes, redirect to home page when trying to access a protected route
        if (publicRoutes.includes(request.nextUrl.pathname as Routes)) {
            return NextResponse.next({ request });
        }
        return NextResponse.redirect(new URL(Routes.home, request.url))
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
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|public/|api/).*)',
    ],
};

