import React, { FC, useMemo, memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { useUiContext } from '../../../../src/UIProvider';
import { getStyle } from './styles';

interface IProps {
    title?: string;
    text?: string;
    isVisible: boolean;
    onCancel?: () => void;
    onConfirm?: () => void;
}

export const ModalPopup: FC<IProps> = memo(({ title, text, isVisible, onCancel, onConfirm }) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    const onConfirmHandle = () => {
        onCancel && onCancel();
        onConfirm && onConfirm();
    }

    return (
        <ReactNativeModal isVisible={isVisible} onBackdropPress={onCancel}>
            <View style={styles.modalContainer} >
                {!!title && <Text style={styles.title}>{title}</Text>}
                {!!text && <Text style={styles.text}>{text}</Text>}
                <View style={styles.buttonWrapper}>
                    {!!onCancel && <Pressable
                        onPress={onCancel}
                        style={({ pressed }) => [styles.button, { opacity: pressed ? 0.5 : 1 }]}
                    >
                        <Text style={styles.buttonText} numberOfLines={1}>{t('cancel')}</Text>
                    </Pressable>}
                    {!!onConfirm && <Pressable
                        onPress={onConfirmHandle}
                        style={({ pressed }) => [styles.button, { opacity: pressed ? 0.5 : 1 }]}
                    >
                        <Text style={styles.buttonText} numberOfLines={1}>{t('ok')}</Text>
                    </Pressable>}
                </View>
            </View>
        </ReactNativeModal>
    );
});
