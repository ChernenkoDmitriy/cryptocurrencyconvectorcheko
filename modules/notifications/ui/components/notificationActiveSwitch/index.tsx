import React, { FC, useMemo } from 'react';
import { Text, View, Switch } from 'react-native'
import { getStyle } from './styles';
import { useUiContext } from '../../../../../src/UIProvider';

interface IProps {
    value: boolean;
    onChange: () => void;
}

export const NotificationActiveSwitch: FC<IProps> = ({ value, onChange }) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('active')}</Text>
            <Switch value={value} onChange={onChange} />
        </View>
    );
};
