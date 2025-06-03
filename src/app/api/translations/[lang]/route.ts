import { AVAILABLE_LANGUAGES, Language } from "@/utils/types/languages";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_req: NextRequest, { params }: { params: Promise<{ lang: string }> }) => {
    const { lang } = await params

    const isValidLang = AVAILABLE_LANGUAGES.includes(lang as Language);

    if (!isValidLang) {
        return NextResponse.json({ error: "Invalid language" }, { status: 400 });
    }

    if (!lang) {
        return NextResponse.json({ error: "Language is required" }, { status: 400 });
    }

    const translations = await import(`@/locals/${lang}.json`);

    return NextResponse.json(translations);
}