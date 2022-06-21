import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../src/UIProvider/colors/IColorsController';
import { scaleVertical } from '../../../../../src/utils';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: scaleVertical(12),
        },
        input: {
            backgroundColor: colors.inputBackground,
            borderRadius: 7,
            paddingLeft: 10,
            width: '100%',
            height: '100%',
            paddingRight: 35,
            color: colors.regularText
        },
        icon: {
            position: 'absolute',
            right: 15
        }
    });
    return styles;
}
