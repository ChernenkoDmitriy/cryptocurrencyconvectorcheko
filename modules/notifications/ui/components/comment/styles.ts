import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../src/UIProvider/colors/IColorsController';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            marginTop: 20,
            minHeight: 50,
            borderBottomColor: colors.shadow,
            borderBottomWidth: 0,
            height: 120,
            marginHorizontal: 0,
            borderRadius: 8,
            backgroundColor: colors.inputBackground,
            paddingLeft: 10,
            width: '100%',
            paddingRight: 35,
            color: colors.regularText
        },
        textInput: {
            paddingVertical: 10,
            textAlignVertical: 'top',
            flex: 1,
            padding: 0,
            marginHorizontal: 10,
            color: colors.titleText,
            fontSize: 14,
            fontFamily: 'Roboto-Regular',
        },
    });
    return styles;
};