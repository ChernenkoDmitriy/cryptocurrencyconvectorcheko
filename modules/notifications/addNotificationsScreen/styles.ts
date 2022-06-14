import { StyleSheet } from 'react-native';
import { IColors } from '../../../src/UIProvider/colors/IColorsController';
import { _size } from '../../../src/utils';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        dropdown: {
            marginBottom: 7,
            borderWidth: 0,
            backgroundColor: colors.inputBackground,
        },
        formContainer: {
            flex: 1,
            paddingHorizontal: 10,
            paddingVertical: 10,
            justifyContent: 'space-between'
        },
    });
    return styles;
}
