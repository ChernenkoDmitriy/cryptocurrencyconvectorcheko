import React, { FC, useMemo } from 'react';
import { useUiContext } from '../../../../../src/UIProvider';
import { TouchableOpacity } from 'react-native'
import { getStyle } from './styles';
import { PlusIcon } from '../../../../../assets/plusIcon';
import { StackNavigationProp } from '@react-navigation/stack';

interface IProps {
    navigation: StackNavigationProp<any>;
}

export const AddNotificationButton: FC<IProps> = ({ navigation }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    const onPress = () => {
        navigation.navigate('ADDNOTIFICATIONS')
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <PlusIcon color={colors.iconColor} />
        </TouchableOpacity>
    );
};
