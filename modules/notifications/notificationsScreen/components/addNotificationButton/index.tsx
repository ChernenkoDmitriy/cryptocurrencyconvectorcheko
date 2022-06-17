import React, { FC, useMemo } from 'react';
import { useUiContext } from '../../../../../src/UIProvider';
import { TouchableOpacity } from 'react-native'
import { getStyle } from './styles';
import { PlusIcon } from '../../../../../assets/plusIcon';
import { StackNavigationProp } from '@react-navigation/stack';
import { notificationsModel } from '../../../../shared/entities/notifications/Notifications';
import { ratesModel } from '../../../../shared/entities/rates/Rates';

interface IProps {
    navigation: StackNavigationProp<any>;
}

export const AddNotificationButton: FC<IProps> = ({ navigation }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    const onPress = () => {
        const randomId = String(Date.now())
        notificationsModel.chosenNotification = { id: randomId, coin: ratesModel.firstRate.id, priceUp: '', priceDown: '', isActive: false }
        navigation.navigate('ADD_NOTIFICATIONS')
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <PlusIcon color={colors.iconColor} />
        </TouchableOpacity>
    );
};
