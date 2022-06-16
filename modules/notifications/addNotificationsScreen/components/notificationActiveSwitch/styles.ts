import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../src/UIProvider/colors/IColorsController';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        title: {
            color: colors.regularText,
            fontFamily: 'Roboto-Regular',
            fontSize: 16
        }
    });
    return styles;
}
