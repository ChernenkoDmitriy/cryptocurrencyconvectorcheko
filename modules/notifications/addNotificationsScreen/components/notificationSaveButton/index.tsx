import { observer } from 'mobx-react';
import React, { FC, useMemo } from 'react';
import { Text, TouchableOpacity } from 'react-native'
import { getStyle } from './styles';
import { useUiContext } from '../../../../../src/UIProvider';

interface IProps {
    onPress: () => void;
    isDisable: boolean
}

export const NotificationSaveButton: FC<IProps> = observer(({ onPress, isDisable }) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors, isDisable), [colors, isDisable]);

    return (
        <TouchableOpacity style={styles.container} onPress={onPress} disabled={!isDisable}>
            <Text style={styles.title}>{t('save')}</Text>
        </TouchableOpacity>
    );
});
