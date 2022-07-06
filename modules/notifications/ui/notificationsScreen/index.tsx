import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { FC, useMemo } from 'react';
import { FlatList, SafeAreaView } from 'react-native'
import { useUiContext } from '../../../../src/UIProvider';
import { INotificationsListItem } from '../../../shared/entities/notifications/INotificationsListItem';
import { notificationsModel } from '../../../shared/entities/notifications/Notifications';
import { ICoin } from '../../../shared/entities/rates/ICoin';
import { AdBanner } from '../../../shared/ui/adBanner';
import { CircleAbsoluteButton } from '../../../shared/ui/circleAbsoluteButton';
import { HeaderWithBackButton } from '../../../shared/ui/headerWithBackButton';
import { useNotification } from '../../presenter/useNotification';
import { setEmptyNotification } from '../../useCases/getCoinsUseCase';
import { NotificationsListItem } from '../components/notificationsListItem';
import { getStyle } from './styles';

interface IProps {
    navigation: StackNavigationProp<any>;
}

export const NotificationsScreen: FC<IProps> = observer(({ navigation }) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);
    const { coinsList, deleteNotification } = useNotification()

    const renderItem = ({ item }: { item: INotificationsListItem }) => {
        const coin = coinsList.find((coin: ICoin) => coin?.id === item.coin)

        const onPressDelete = () => {
            deleteNotification(item.id);
        }

        const onPressEdit = () => {
            notificationsModel.chosenNotification = item;
            navigation.navigate('ADD_NOTIFICATIONS')
        }

        return <NotificationsListItem item={item} coin={coin} onPressDelete={onPressDelete} onPressEdit={onPressEdit} />
    };

    const onPress = () => {
        setEmptyNotification()
        navigation.navigate('ADD_NOTIFICATIONS')
    }

    return (
        <SafeAreaView style={styles.container}>
            <HeaderWithBackButton title={t('notifications')} />
            <FlatList
                keyboardDismissMode='interactive'
                data={notificationsModel.notificationsList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainerStyle}
            />
            <CircleAbsoluteButton onPress={onPress} />
            <AdBanner />
        </SafeAreaView>
    );
});