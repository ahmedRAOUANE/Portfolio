import LoginForm from "@/components/login-form";
import { loadTranslation } from "@/utils/data/load-translations";
import { Language } from "@/utils/types/languages";
import Link from "next/link";

export default async function LoginPage({ params }: { params: Promise<{ lang: string }> }) {
    const {lang } = await params;
    const translations = await loadTranslation(lang as Language);

    const sectionTranslations = translations.auth.login;

    return (
        <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="relative max-w-md w-full space-y-8 p-8 rounded-2xl border border-primary/30 bg-primary/5 backdrop-blur">
                <Link href={`/${lang}`} className="absolute -top-5 -right-5 shadow-lg text-danger bg-danger/10 hover:bg-danger/20 transition-colors duration-200 rounded-full p-2 w-10 aspect-square flex items-center justify-center">
                    X
                </Link>
                
                <div>
                    <h2 className="text-center text-3xl font-bold text-primary">
                        {sectionTranslations.title}
                    </h2>

                    <p className="mt-2 text-center text-sm text-light">
                        {sectionTranslations.description}
                    </p>
                </div>

                <LoginForm translations={sectionTranslations.form} />
            </div>
        </div>
    )
}

