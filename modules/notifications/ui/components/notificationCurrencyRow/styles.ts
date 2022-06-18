import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../src/UIProvider/colors/IColorsController';
import { scaleHorizontal, scaleVertical } from '../../../../../src/utils';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: scaleHorizontal(10),
            backgroundColor: colors.inputBackground,
            height: 50,
            borderRadius: 7,
            marginBottom: 7
        },
        containerLogo: {
            paddingVertical: 4,
            height: '100%',
            width: 25,
            alignItems: 'center',
            justifyContent: 'center'
        },
        logo: {
            width: scaleVertical(40),
            height: scaleVertical(40),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
        },
        coinName: {
            color: colors.regularText,
            fontFamily: 'Roboto-Regular',
            fontSize: 16
        },
        textWrapper: {
            flex: 1,
            alignItems: 'flex-end',
        }
    });
    return styles;
}
