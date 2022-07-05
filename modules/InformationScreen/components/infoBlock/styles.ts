import { StyleSheet } from 'react-native';
import { IColors } from '../../../../src/UIProvider/colors/IColorsController';
import { scaleFontSize, scaleHorizontal, scaleVertical } from '../../../../src/utils';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            paddingHorizontal: scaleHorizontal(20),
            paddingVertical: scaleVertical(10),
        },
        questionText: {
            fontSize: scaleFontSize(16),
            fontWeight: '500',
            color: colors.titleText,
            marginBottom: 10,
            textAlign: 'justify'
        },
        answerText: {
            fontSize: scaleFontSize(14),
            color: colors.regularText,
            textAlign: 'justify'
        }
    });
    return styles;
}
