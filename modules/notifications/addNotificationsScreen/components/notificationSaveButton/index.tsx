import { observer } from 'mobx-react';
import React, { FC, useMemo } from 'react';
import { Text, TouchableOpacity } from 'react-native'
import { getStyle } from './styles';
import { useUiContext } from '../../../../../src/UIProvider';

interface IProps {
    onPress: () => void
}

export const NotificationSaveButton: FC<IProps> = observer(({ onPress }) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.title}>{t('save')}</Text>
        </TouchableOpacity>
    );
});
