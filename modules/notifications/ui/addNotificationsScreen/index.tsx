import { observer } from 'mobx-react';
import React, { FC, useMemo } from 'react';
import { Keyboard, View } from 'react-native'
import { useUiContext } from '../../../../src/UIProvider';
import { HeaderWithBackButton } from '../../../shared/ui/headerWithBackButton';
import { getStyle } from './styles';
import { CurrencyPriceInput } from '../components/currencyPriceInput';
import { ArrowUp } from '../../../../assets/arrowUp/arrowUp';
import { ArrowDown } from '../../../../assets/arrowDown/arrowDown';
import { NotificationActiveSwitch } from '../components/notificationActiveSwitch';
import { NotificationSaveButton } from '../components/notificationSaveButton';
import { useAddNotification } from '../../presenter/useAddNotification';
import { ChartPriceHeader } from '../../../chart/ui/components/chartPriceHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenContainer } from '../../../shared/ui/screenContainer';
import { AdBanner } from '../../../shared/ui/adBanner';
import { CommentNotification } from '../components/comment';

export const AddNotificationsScreen: FC = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);
    const { upNumber, downNumber, isEnabled, activateNotification, onChangeUpPrice, comment, setComment,
        onChangeDownPrice, goToCurrencyList, onSaveNotification } = useAddNotification();

    return (
        <ScreenContainer scrollEnabled>
            <HeaderWithBackButton title={t('notifications')} />
            <View style={styles.contentWrapper} onStartShouldSetResponder={Keyboard.dismiss as any}>
                <TouchableOpacity onPress={goToCurrencyList} >
                    <ChartPriceHeader />
                </TouchableOpacity>
                <CurrencyPriceInput placeholder={'maxNotificationAmount'} icon={<ArrowUp />} value={upNumber} onChangeText={onChangeUpPrice} />
                <CurrencyPriceInput placeholder={'minNotificationAmount'} icon={<ArrowDown />} value={downNumber} onChangeText={onChangeDownPrice} />
                <NotificationActiveSwitch value={isEnabled} onChange={activateNotification} />
                <CommentNotification
                    multiline
                    placeholder={t('comment')}
                    value={comment}
                    onChangeText={setComment}
                />
            </View>
            <NotificationSaveButton onPress={onSaveNotification} isDisable={(!!upNumber || !!downNumber)} />
            <AdBanner />
        </ScreenContainer >
    );
});