import { StyleSheet } from 'react-native';
import { IColors } from '../../../../src/UIProvider/colors/IColorsController';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            paddingTop: 10,
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
        },
        buttonBack: {
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
        },
        contentWrapper: {
            flexDirection: 'row',
        },
        titleContainer: {
            flex: 1,
            marginLeft: 10,
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        titleContainerButton: {
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        title: {
            fontSize: 20,
            lineHeight: 24,
            color: colors.titleText,
            fontFamily: 'Roboto-Regular',
        },
    });
    return styles;
}
