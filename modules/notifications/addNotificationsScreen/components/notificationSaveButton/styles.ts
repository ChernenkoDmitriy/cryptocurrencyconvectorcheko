import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../src/UIProvider/colors/IColorsController';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 7,
            backgroundColor: colors.accentText
        },
        title: {
            color: colors.regularText,
            fontFamily: 'Roboto-Regular',
            fontSize: 16
        }
    });
    return styles;
}
