import { Dimensions, PixelRatio, Platform } from "react-native";

const idealWidth: number = 375;
const idealHeight: number = 812;
export const _size: { width: number, height: number } = Dimensions.get('window');
const _ratio: number = PixelRatio.getFontScale();

export const isIOS: boolean = Platform.OS === 'ios';

export const scaleHorizontal = (inWidth: number = 1): number => {
    const delimiter: number = idealWidth / inWidth;
    return _size.width / delimiter;
};

export const scaleVertical = (inHeight: number = 1) => {
    const delimiter: number = idealHeight / inHeight;
    return _size.height / delimiter;
};

export const scaleFontSize = (fontSize: number = 1): number => {
    const divisionRatio: number = idealWidth / (fontSize / _ratio);
    return _size.width / divisionRatio;
};

export const scaleLineHeight = (lineHeight: number = 1): number => {
    const divisionRatio: number = idealHeight / (lineHeight / _ratio);
    return _size.height / divisionRatio;
};

export const formatNumberWithDelimiters = (value: string | number | undefined): string => {
    try {
        if (typeof value === 'number' || (typeof value === 'string' && !isNaN(parseInt(value)))) {
            let valueForRender: string;
            if (typeof value === 'number') {
                valueForRender = value.toString(10);
            } else {
                valueForRender = value;
            }
            return valueForRender.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + ' ');
        } else {
            return '0';
        }
    } catch (error) {
        return '0';
    }
};