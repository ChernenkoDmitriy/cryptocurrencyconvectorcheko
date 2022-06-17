import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../src/UIProvider/colors/IColorsController';
import { scaleVertical } from '../../../../../src/utils';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: 70,
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: colors.shadow,
            backgroundColor: colors.card,
            paddingRight: 20,
            shadowColor: colors.shadow,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.1,
            elevation: 5,
            justifyContent: 'space-between',
        },
        button: {
            height: scaleVertical(50),
            width: scaleVertical(50),
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonsWrapper: {
            flexDirection: 'row'
        }
    });
    return styles;
}
