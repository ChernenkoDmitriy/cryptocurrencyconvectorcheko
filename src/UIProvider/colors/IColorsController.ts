export type IColors = {
    accentText: string;
    inputBackground: string;
    accentColorLight: string;
    background: string;
    border: string;
    regularText: string;
    buttonNumber: string;
    borderCurrency: string;
    subText: string;
    iconColor: string;
}

export interface IColorsController {
    theme: 'dark' | 'light';
    colors: IColors;
    saveTheme: (data: 'dark' | 'light') => void;
}
