import { t } from 'i18n-js';
import { observer } from 'mobx-react';
import React, { FC, useMemo } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { useUiContext } from '../../../../src/UIProvider';
import { getStyle } from './styles';
import { BellIcon } from '../../../../assets/bellIcon';
import { scaleVertical } from '../../../../src/utils';

interface IProps {
    onCancel: () => void;
    onPurchase: () => void;
    onConfirm: () => void;
    visible: boolean;
    text: string;
    confirmText: string;
    purchaseText: string;
    confirmColor?: string;
    confirmIcon?: React.ReactNode;
    cancelText?: string;
    cancelIcon?: React.ReactNode;
}

export const CustomAlert: FC<IProps> = observer(({ onPurchase, purchaseText, visible, text, cancelIcon, confirmText, cancelText, confirmColor, confirmIcon, onCancel, onConfirm }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    return (
        <Modal visible={visible} transparent={true}>
            <View style={styles.background}>
                <View style={styles.container}>
                    <View style={styles.titleWrapper}>
                        <BellIcon height={30} width={30} />
                        <Text style={[styles.text, { marginTop: scaleVertical(10) }]}>{text}</Text>
                    </View>
                    <View style={styles.separator} />
                    {!!confirmText && <TouchableOpacity style={styles.rowContainer} onPress={onConfirm}>
                        <Text style={[styles.text, { color: confirmColor || colors.titleText }]}>{confirmText}</Text>
                        {confirmIcon}
                    </TouchableOpacity>}
                    <View style={styles.separator} />
                    <TouchableOpacity style={styles.rowContainer} onPress={onPurchase}>
                        <Text style={[styles.text, { color: confirmColor || colors.titleText }]}>{purchaseText}</Text>
                        {confirmIcon}
                    </TouchableOpacity>
                    {/* <View style={styles.separator} />
                    <TouchableOpacity style={styles.rowContainer} onPress={onCancel}>
                        <Text style={styles.text}>{cancelText || t('cancel')}</Text>
                        {cancelIcon}
                    </TouchableOpacity> */}
                </View>
            </View>
        </Modal>
    )
});
