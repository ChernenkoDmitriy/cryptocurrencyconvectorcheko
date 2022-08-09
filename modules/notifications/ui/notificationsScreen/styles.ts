import { StyleSheet } from 'react-native';
import { IColors } from '../../../../src/UIProvider/colors/IColorsController';
import { scaleFontSize } from '../../../../src/utils';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        list: {
            paddingHorizontal: 10,
            paddingVertical: 5
        },
        contentContainerStyle: {
            paddingBottom: 10
        },
        searchContainer: {
            flexDirection: 'row'
        },
        filterContainer: {
            flexDirection: 'row',
            paddingHorizontal: 10,
            height: 30,
            alignItems: 'center'
        },
        separator: {
            alignSelf: 'center',
            height: '60%',
            width: 1,
            backgroundColor: colors.titleText
        },
        filterButton: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginHorizontal: 10,
        },
        text: {
            fontSize: scaleFontSize(14),
            color: colors.regularText,
            fontFamily: 'Roboto-Regular',
        },
        activeFilter: {
            backgroundColor: colors.accentText,
            borderRadius: 5,
        }
    });
    return styles;
}
