import { observer } from 'mobx-react';
import React, { FC, useMemo } from 'react';
import { useUiContext } from '../../../../../src/UIProvider';
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { getStyle } from './styles';
import { ArrowDown } from '../../../../../assets/arrowDown/arrowDown';
import { ArrowUp } from '../../../../../assets/arrowUp/arrowUp';
import { INotificationsListItem } from '../../../../shared/entities/notifications/INotificationsListItem';
import { ICoin } from '../../../../shared/entities/rates/ICoin';
import { TrashIcon } from '../../../../../assets/trashIcon';

interface IProps {
    item: INotificationsListItem;
    coin: ICoin | undefined;
    onPressDelete: () => void;
    onPressEdit: () => void;
}

export const NotificationsListItem: FC<IProps> = observer(({ item, coin, onPressDelete, onPressEdit }) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors, item.isActive), [colors, item.isActive]);

    return (
        <TouchableOpacity style={styles.container} onPress={onPressEdit}>
            <View style={styles.wrapper}>
                <View style={styles.rowWrapper}>
                    <Image source={{ uri: String(coin?.image) }} style={styles.logo} resizeMode='stretch' />
                    <View style={styles.rateWrapper}>
                        <Text style={styles.rateCodeText}>{coin?.symbol.toUpperCase()}/USD</Text>
                        <Text style={styles.ratePriceText}>${coin?.current_price}</Text>
                    </View>
                    <Text style={styles.isActiveText}>{t('active')}</Text>
                </View>
                <View style={styles.expectedPriceContainer}>
                    {item.priceUp ?
                        <View style={styles.expectedPriceWrapper}>
                            <ArrowUp />
                            <Text style={styles.expectedPriceText}>price: ${item.priceUp}</Text>
                        </View>
                        : null
                    }
                    {item.priceDown ?
                        <View style={styles.expectedPriceWrapper}>
                            <ArrowDown />
                            <Text style={styles.expectedPriceText}>price: ${item.priceDown}</Text>
                        </View>
                        : null
                    }
                </View>
            </View>
            <TouchableOpacity style={styles.deleteButtonWrapper} onPress={onPressDelete}>
                <TrashIcon color={colors.icon} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
});
