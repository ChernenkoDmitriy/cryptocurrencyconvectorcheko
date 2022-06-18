import { StyleSheet } from 'react-native';
import { IColors } from '../../../../src/UIProvider/colors/IColorsController';
import { scaleHorizontal, scaleVertical } from '../../../../src/utils';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        modal: {
            flex: 1,
            justifyContent: 'flex-end',
            margin: 0,
        },
        container: {
            paddingTop: 16,
            backgroundColor: colors.background,
            height: '70%',
            width: '100%',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
        },
        modalIndicator: {
            backgroundColor: colors.shadow,
            width: scaleHorizontal(50),
            height: scaleVertical(4),
            borderRadius: 8,
            alignSelf: 'center',
            marginVertical: scaleVertical(8)
        },
        title: {
            fontSize: 18,
            lineHeight: 22,
            color: colors.titleText,
            fontFamily:'Roboto-Regular',
            marginVertical: 8, 
            fontWeight: '500',
             alignSelf: 'center',
        }
    });
    return styles;
}
