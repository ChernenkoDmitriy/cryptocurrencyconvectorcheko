import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../src/UIProvider/colors/IColorsController';
import { scaleVertical } from '../../../../../src/utils';

export const getStyle = (_colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            height: scaleVertical(50),
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        },
    });
    return styles;
}
