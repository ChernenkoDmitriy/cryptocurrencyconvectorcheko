import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { FC, useMemo } from 'react';
import { FlatList, SafeAreaView } from 'react-native'
import { useUiContext } from '../../../src/UIProvider';
import { INotificationsListItem } from '../../shared/entities/notifications/INotificationsListItem';
import { notificationsModel } from '../../shared/entities/notifications/Notifications';
import { ICoin } from '../../shared/entities/rates/ICoin';
import { Header } from '../../shared/ui/header';
import { useNotification } from '../presenter/useNotification';
import { AddNotificationButton } from './components/addNotificationButton';
import { NotificationsListItem } from './components/notificationsListItem';
import { getStyle } from './styles';

interface IProps {
    navigation: StackNavigationProp<any>;
}

export const NotificationsScreen: FC<IProps> = observer(({ navigation }) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);
    const { coinsList, deleteNotification } = useNotification()


    const renderItem = ({ item, index }: { item: INotificationsListItem, index: number }) => {
        const coin = coinsList.find((coin: ICoin) => coin?.id === item.coin)

        const onPressDelete = () => {
            deleteNotification(index)
        }

        return <NotificationsListItem item={item} coin={coin} onPress={onPressDelete} />
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title={t('notifications')} />
            <FlatList
                data={notificationsModel.notificationsList}
                renderItem={renderItem}
                keyExtractor={(item, index) => String(index)}
                style={styles.list}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainerStyle}
            />
            <AddNotificationButton navigation={navigation} />
        </SafeAreaView>
    );
});