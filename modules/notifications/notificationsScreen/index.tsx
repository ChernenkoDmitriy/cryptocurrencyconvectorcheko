import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { FC, useMemo } from 'react';
import { FlatList, SafeAreaView } from 'react-native'
import { useUiContext } from '../../../src/UIProvider';
import { Header } from '../../shared/ui/header';
import { AddNotificationButton } from './components/addNotificationButton';
import { NotificationsListItem } from './components/notificationsListItem';
import { INotification, notificationsMock } from './notificationsMock';
import { getStyle } from './styles';

interface IProps {
    navigation: StackNavigationProp<any>;
}

export const NotificationsScreen: FC<IProps> = observer(({ navigation }) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    const renderItem = ({ item }: { item: INotification }) => (
        <NotificationsListItem item={item} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header title={t('notifications')} />
            <FlatList
                data={notificationsMock}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.list}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainerStyle}
            />
            <AddNotificationButton navigation={navigation} />
        </SafeAreaView>
    );
});
