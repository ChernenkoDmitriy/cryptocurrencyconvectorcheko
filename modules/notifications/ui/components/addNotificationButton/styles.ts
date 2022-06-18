import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../src/UIProvider/colors/IColorsController';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            width: 40,
            height: 40,
            borderRadius: 40,
            backgroundColor: colors.accentColorLight,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 15,
            right: 15,
        }
    });
    return styles;
}
