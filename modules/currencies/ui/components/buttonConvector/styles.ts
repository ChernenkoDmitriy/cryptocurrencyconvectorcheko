import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { IColors } from '../../../../../src/UIProvider/colors/IColorsController';
import { scaleFontSize } from '../../../../../src/utils';

const { width } = Dimensions.get('screen');
export const BUTTON_SIZE = width / 4;

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            width: BUTTON_SIZE,
            height: '20%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            color: colors.regularText,
            fontSize: scaleFontSize(36),
        },
    });
    return styles;
}
