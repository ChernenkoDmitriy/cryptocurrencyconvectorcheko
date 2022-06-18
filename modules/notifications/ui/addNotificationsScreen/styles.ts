import { StyleSheet } from 'react-native';
import { IColors } from '../../../../src/UIProvider/colors/IColorsController';
import { _size } from '../../../../src/utils';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        contentWrapper: {
            flex: 1,
            paddingHorizontal: 16,
            paddingVertical: 16,
        },
    });
    return styles;
}
