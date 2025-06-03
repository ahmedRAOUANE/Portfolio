import ar from '@/locals/ar.json';

type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

export type Translations = DeepReadonly<typeof ar>; 