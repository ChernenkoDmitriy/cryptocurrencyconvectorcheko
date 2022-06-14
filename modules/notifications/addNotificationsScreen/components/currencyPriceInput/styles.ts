import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../src/UIProvider/colors/IColorsController';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 7
        },
        input: {
            backgroundColor: colors.inputBackground,
            borderRadius: 7,
            paddingLeft: 10,
            width: '100%',
            paddingRight: 35,
            color: colors.regularText
        },
        icon: {
            position: 'absolute',
            right: 15
        }
    });
    return styles;
}
