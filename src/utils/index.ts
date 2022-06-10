import { Dimensions, PixelRatio } from "react-native";

const idealWidth: number = 375;
const idealHeight: number = 812;
const _size: { width: number, height: number } = Dimensions.get('window');
const _ratio: number = PixelRatio.getFontScale();

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