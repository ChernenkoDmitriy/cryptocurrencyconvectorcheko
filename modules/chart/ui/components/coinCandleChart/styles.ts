import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../src/UIProvider/colors/IColorsController';
import { scaleHorizontal, scaleVertical } from '../../../../../src/utils';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        chart: {
            height: scaleVertical(350),
            marginHorizontal: scaleHorizontal(16),
        },
    });
    return styles;
}
