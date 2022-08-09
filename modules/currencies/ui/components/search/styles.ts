import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../src/UIProvider/colors/IColorsController';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            paddingHorizontal: 10,
            marginVertical: 10,
            height: 40,
            flexDirection: 'row',
        },
        inputContainer: {
            flex: 1,
            backgroundColor: colors.inputBackground,
            borderRadius: 8,
        },
        input: {
            flex: 1,
            color: colors.regularText,
            paddingHorizontal: 10,
            fontSize: 16,
        },
        buttonDelete: {
            paddingLeft: 10,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            color: colors.regularText,
            fontSize: 18,
        },
    });
    return styles;
}
