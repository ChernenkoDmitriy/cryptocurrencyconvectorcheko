import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { FC, useMemo } from 'react';
import { FlatList, SafeAreaView } from 'react-native'
import { useUiContext } from '../../../src/UIProvider';
import { INotificationsListItem } from '../../shared/entities/notifications/INotificationsListItem';
import { notificationsModel } from '../../shared/entities/notifications/Notifications';
import { Header } from '../../shared/ui/header';
import { AddNotificationButton } from './components/addNotificationButton';
import { NotificationsListItem } from './components/notificationsListItem';
import { getStyle } from './styles';

interface IProps {
    navigation: StackNavigationProp<any>;
}

export const NotificationsScreen: FC<IProps> = observer(({ navigation }) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    const renderItem = ({ item }: { item: INotificationsListItem }) => (
        <NotificationsListItem item={item} />
    );

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
