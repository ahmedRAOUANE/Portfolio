export enum Languages {
    Arabic = 'arabic',
    English = 'english',
}

export const AVAILABLE_LANGUAGES = Object.values(Languages);
export type Language = keyof typeof Languages;