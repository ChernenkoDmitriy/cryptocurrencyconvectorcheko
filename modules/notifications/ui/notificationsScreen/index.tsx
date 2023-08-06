import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { FC, useMemo, useState } from 'react';
import { FlatList, SafeAreaView, TouchableOpacity, View, Text } from 'react-native'
import { SortingIcon } from '../../../../assets/SortingIcon';
import { useUiContext } from '../../../../src/UIProvider';
import { Search } from '../../../currencies/ui/components/search';
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
    const [sortBy, setSortBy] = useState('');
    const [searchText, setSearchText] = useState('');
    const styles = useMemo(() => getStyle(colors), [colors]);
    const { coinsList, deleteNotification } = useNotification();

    const onSortByActive = () => {
        setSortBy(sortBy === 'active' ? '' : 'active');
    }

    const onSortByInactive = () => {
        setSortBy(sortBy === 'inactive' ? '' : 'inactive');
    }

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

    const data = useMemo(() => {
        if (searchText) {
            return notificationsModel.notificationsList.filter((item) => item?.symbol?.toLowerCase().includes(searchText.toLowerCase()));
        }
        return notificationsModel.notificationsList;
    }, [searchText, notificationsModel.notificationsList]);

    const sortedData = useMemo(() => {
        if (!sortBy) {
            return data;
        }
        return [...data].sort((a, b) => {
            if (sortBy === 'inactive') {
                return Number(a.isActive) - Number(b.isActive);
            } else if (sortBy === 'active') {
                return Number(b.isActive) - Number(a.isActive);
            }
            return 0;
        })
    }, [data, sortBy])

    return (
        <SafeAreaView style={styles.container}>
            <HeaderWithBackButton title={t('notifications')} />
            <View style={styles.searchContainer}>
                <Search value={searchText} onChangeText={setSearchText} />
            </View>
            <View style={styles.filterContainer}>
                <SortingIcon color={colors.icon} />
                <TouchableOpacity style={[styles.filterButton, sortBy === 'active' ? styles.activeFilter : undefined]} onPress={onSortByActive}>
                    <Text style={styles.text}>{t('active')}</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity style={[styles.filterButton, sortBy === 'inactive' ? styles.activeFilter : undefined]} onPress={onSortByInactive}>
                    <Text style={styles.text}>{t('inactive')}</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                keyboardDismissMode='interactive'
                data={sortedData}
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