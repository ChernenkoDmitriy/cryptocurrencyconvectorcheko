import { StyleSheet } from 'react-native';
import { IColors } from '../../../src/UIProvider/colors/IColorsController';

export const getStyle = (colors: IColors) => {
    return StyleSheet.create({
        container: {
            height: '60%',
            flexWrap: 'wrap',
            flexDirection: 'row',
            elevation: 3,
            shadowColor: 'red',
            // borderTopColor: colors.border,
            // borderTopWidth: 1,
        },
    })
}; 
