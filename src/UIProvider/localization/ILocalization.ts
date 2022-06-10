export interface ILocalization {
    readonly locales: string[];
    readonly locale: string;
    t: (key: string) => string;
    setTranslation: (translations: any) => void;
    setLocale: (value: string) => void;
}
