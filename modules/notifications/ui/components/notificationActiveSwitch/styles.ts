import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../src/UIProvider/colors/IColorsController';
import { scaleFontSize, scaleVertical } from '../../../../../src/utils';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            marginTop: scaleVertical(12),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        title: {
            fontSize: 20,
            color: colors.titleText,
            fontFamily:'Roboto-Regular'
        }
    });
    return styles;
}
