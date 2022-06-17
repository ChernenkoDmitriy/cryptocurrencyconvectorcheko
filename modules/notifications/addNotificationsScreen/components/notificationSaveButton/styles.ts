import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../src/UIProvider/colors/IColorsController';

export const getStyle = (colors: IColors, isDisable: boolean) => {
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 7,
            backgroundColor: colors.accentText,
            opacity: isDisable ? 1 : 0.6
        },
        title: {
            color: colors.regularText,
            fontFamily: 'Roboto-Regular',
            fontSize: 16
        }
    });
    return styles;
}
