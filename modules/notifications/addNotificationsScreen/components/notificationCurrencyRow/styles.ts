import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../src/UIProvider/colors/IColorsController';
import { scaleVertical } from '../../../../../src/utils';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
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
            width: scaleVertical(42),
            height: scaleVertical(42),
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
