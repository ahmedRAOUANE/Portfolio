import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isUserAuthenticated } from './utils/validations';
import { AVAILABLE_ROUTES, Routes } from './utils/types/routes';
import { Roles } from './utils/types/roles';
import { AVAILABLE_LANGUAGES, Language, Languages } from '@/utils/types/languages';

/* 
 * protected routes from non authenticated users - non authenticated users can not access these routes 
*/
const protectedRoutesFromNonAuth = [Routes.admin];

/* 
* protected routes from authenticated users - authenticated users can not access these routes 
* admin route is accessable only for admin users
* login route is accessable only for non authenticated users
*/
const protectedRoutesFromAuth = [Routes.admin, Routes.login];

/* 
* public routes - these routes are accessable for all users
* they change based on the features added
*/
const publicRoutes = [Routes.home, Routes.feedback];

/*
* these are the routes that have translation and the ability to switch between languages
*/
const translatedRoutes = [
    Routes.home,
    Routes.feedback,
    Routes.login
]

export async function middleware(request: NextRequest) {
    const preferredLanguage = getPreferredLanguage(request);

    try {
        const path = request.nextUrl.pathname;
        const routeSigments = path.split('/');
        const secondSegment = routeSigments[1]; // the second segment is the language in trnslated routes, but its a rotue in non translated route

        // check if the second segment refers to a language
        const isLang = secondSegment in Languages;

        const currentLang = isLang ? secondSegment : preferredLanguage;

        // change the current route based on the second segment
        const currentRoute = (isLang
            ? routeSigments[2]
                ? `/${routeSigments[2]}`
                : Routes.home
            : `/${secondSegment}`) as Routes;

        if (!AVAILABLE_ROUTES.includes(currentRoute)) {
            return NextResponse.redirect(new URL(`/${currentLang}`, request.url));
        }

        if (!isLang && translatedRoutes.includes(currentRoute)) {
            return NextResponse.redirect(new URL(`/${currentLang}${currentRoute}`));
        }

        if (publicRoutes.includes(currentRoute)) {
            return NextResponse.next({ request })
        }

        const { data } = await isUserAuthenticated();

        if (!data && protectedRoutesFromNonAuth.includes(currentRoute)) {
            return NextResponse.redirect(new URL(`/${currentLang}${Routes.login}`, request.url));
        }

        const role = data?.role;
        if (role === Roles.admin && currentRoute === Routes.admin) {
            return NextResponse.next({ request });
        }

        if (!!data && protectedRoutesFromAuth.includes(currentRoute)) {
            return NextResponse.redirect(new URL(`/${preferredLanguage}`, request.url));
        }

        return NextResponse.next({ request });
    } catch (error) {
        console.log("middleware > Error > ", error);
        
        return NextResponse.redirect(new URL(preferredLanguage, request.url));
    }
}

const getPreferredLanguage = (request: NextRequest): Language => {
    const preferredLanguage = request.headers.get('accept-language')?.split(',')[0].split('-')[0] || 'en';
    return AVAILABLE_LANGUAGES.includes(preferredLanguage as Language) ? preferredLanguage as Language : 'en';
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
        '/((?!_next/static|_next/image|logo.svg|favicon.ico|public/|api/|google[\\w-]+\\.html|sitemap.xml).*)',
    ],
};
