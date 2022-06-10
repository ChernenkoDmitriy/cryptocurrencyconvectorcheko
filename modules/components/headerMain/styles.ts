import { StyleSheet } from 'react-native';
import { IColors } from '../../../src/UIProvider/colors/IColorsController';
import { scaleVertical } from '../../../src/utils';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            height: scaleVertical(70),
            width: '100%',
            borderBottomColor: colors.border,
            borderBottomWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        button: {
            height: scaleVertical(50),
            width: scaleVertical(50),
            justifyContent: 'center',
            alignItems: 'center',
        }
    });
    return styles;
}
