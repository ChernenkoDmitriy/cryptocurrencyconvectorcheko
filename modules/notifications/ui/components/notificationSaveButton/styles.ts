import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../src/UIProvider/colors/IColorsController';

export const getStyle = (colors: IColors, isDisable: boolean) => {
    const styles = StyleSheet.create({
        container: {
            marginBottom: 20,
            marginHorizontal: 16,
            height: 48,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 7,
            backgroundColor: colors.buttonNumber,
            opacity: isDisable ? 1 : 0.6
        },
        title: {
            color: colors.titleText,
            fontFamily: 'Roboto-Regular',
            fontSize: 16
        }
    });
    return styles;
}
