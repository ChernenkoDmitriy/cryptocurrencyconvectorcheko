export type IColors = {
    notificationBell: string;
    positiveRate: string;
    negativeRate: string;
    buttonNumber: string;
    inputBackground: string;
    lightButton: string;
    accentText: string;
    textAccentButton: string;
    modalBackground: string;
    icon: string;
    error: string;
    low: string;
    medium: string;
    high: string;
    shadow: string;
    background: string;
    card: string;
    buttonText: string;
    regularText: string;
    titleText: string;
    inactiveText: string;
    accentColorLight: string;
    accentColorDark: string;
}

export interface IColorsController {
    theme: 'dark' | 'light';
    colors: IColors;
    saveTheme: (data: 'dark' | 'light') => void;
}
