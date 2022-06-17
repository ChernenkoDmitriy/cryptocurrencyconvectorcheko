import React, { FC, useMemo } from 'react';
import { useUiContext } from '../../../../../src/UIProvider';
import { TouchableOpacity } from 'react-native'
import { getStyle } from './styles';
import { PlusIcon } from '../../../../../assets/plusIcon';
import { StackNavigationProp } from '@react-navigation/stack';
import { setEmptyNotification } from '../../../useCases/getCoinsUseCase';

interface IProps {
    navigation: StackNavigationProp<any>;
}

export const AddNotificationButton: FC<IProps> = ({ navigation }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    const onPress = () => {
        setEmptyNotification()
        navigation.navigate('ADD_NOTIFICATIONS')
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <PlusIcon color={colors.icon} />
        </TouchableOpacity>
    );
};
