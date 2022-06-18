import { StyleSheet } from 'react-native';
import { IColors } from '../../../../src/UIProvider/colors/IColorsController';

export const getStyle = (colors: IColors) => {
    return StyleSheet.create({
        modalContainer: {
            backgroundColor: colors.card,
            padding: 15,
            borderRadius: 8,
            width: '100%'
        },
        title: {
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
            marginVertical: 5,
        },
        text: {
            fontSize: 18,
            textAlign: 'center',
            marginVertical: 10,
        },
        buttonText: {
            fontSize: 18,
            color: colors.textAccentButton,
            textTransform: 'capitalize',
            fontWeight: '500',
        },
        buttonWrapper: {
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around'
        },
        button: {
            padding: 10,
            borderRadius: 8,
        },
    });
}
