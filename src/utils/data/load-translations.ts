import { baseUrl } from "../constansts";
import { Language } from "../types/languages";
import { Translations } from "../types/translations";

export const loadTranslation = async (lang: Language): Promise<Translations> => {
    const res = await fetch(`${baseUrl}/api/translations/${lang}`);
    return await res.json();
}