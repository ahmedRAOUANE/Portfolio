export enum Languages {
    ar = 'arabic',
    en = 'english',
}

export type Language = keyof typeof Languages;
export const AVAILABLE_LANGUAGES = Object.keys(Languages) as Language[];