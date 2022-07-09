import { StyleSheet } from 'react-native';
import { IColors } from '../../../../src/UIProvider/colors/IColorsController';
import { scaleVertical } from '../../../../src/utils';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.buttonNumber,
            width: 55,
            height: 55,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: scaleVertical(80),
            right: 20,
            shadowOpacity: 1,
            shadowRadius: 3,
            shadowOffset: { height: 0, width: 0 },
            shadowColor: colors.shadow,
            elevation: 3,
        },
        text: {
            color: '#FFFFFF',
            fontSize: 40,
            lineHeight: 50,
        },
    });
    return styles;
}
