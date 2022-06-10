import { StyleSheet } from 'react-native';
import { IColors } from '../../../../src/UIProvider/colors/IColorsController';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            marginTop: 16,
            width: '100%',
            height: 60,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 24,
        },
        textContainer: {
            flex: 1,
            marginLeft: 20,
        },
        title: {
            fontSize: 18,
            lineHeight: 22,
            fontWeight: '500',
            color: colors.regularText,
        },
        description: {
            textTransform: 'capitalize',
            fontSize: 14,
            lineHeight: 18,
            color: colors.regularText,
        }
    });
    return styles;
}
