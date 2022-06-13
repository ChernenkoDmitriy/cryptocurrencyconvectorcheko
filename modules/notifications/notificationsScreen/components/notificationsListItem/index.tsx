import { observer } from 'mobx-react';
import React, { FC, useMemo } from 'react';
import { useUiContext } from '../../../../../src/UIProvider';
import { Text, View } from 'react-native'
import { INotificationMock } from '../../notificationsMock';
import { getStyle } from './styles';

interface IProps {
    item: INotificationMock;
}

export const NotificationsListItem: FC<IProps> = observer(({ item }) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors, item.isActive), [colors, item.isActive]);

    return (
        <View style={styles.container}>
            <View style={styles.rowWrapper}>
                <View style={styles.coinImage} />
                <View style={styles.rateWrapper}>
                    <Text style={styles.rateCodeText}>BTC/USD</Text>
                    <Text style={styles.ratePriceText}>$23.5566</Text>
                </View>
                <Text style={styles.isActiveText}>Active</Text>
            </View>
            <View style={styles.expectedPriceContainer}>
                {item.priceUp ?
                    <View style={styles.expectedPriceWrapper}>
                        <Text style={styles.expectedPriceArrow}>|</Text>
                        <Text style={styles.expectedPriceText}>price: ${item.priceUp}</Text>
                    </View>
                    : null
                }
                {item.priceDown ?
                    <View style={styles.expectedPriceWrapper}>
                        <Text style={styles.expectedPriceArrow}>|</Text>
                        <Text style={styles.expectedPriceText}>price: ${item.priceDown}</Text>
                    </View>
                    : null
                }
            </View>
        </View>
    );
});
