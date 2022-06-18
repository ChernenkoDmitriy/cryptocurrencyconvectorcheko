import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../src/UIProvider/colors/IColorsController';
import { scaleVertical } from '../../../../../src/utils';

export const getStyle = (colors: IColors) => {
    return StyleSheet.create({
        container: {
            height: '60%',
            flexWrap: 'wrap',
            flexDirection: 'row',
            elevation: 3,
        },
        logo: {
            width: scaleVertical(22),
            height: scaleVertical(22),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            marginRight: 5
        },
        chartIcon: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        }
    })

}; 
