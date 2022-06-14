import { observer } from 'mobx-react';
import React, { FC, useMemo, useState } from 'react';
import { Text, View, Switch } from 'react-native'
import { getStyle } from './styles';
import { useUiContext } from '../../../../../src/UIProvider';

export const NotificationActiveSwitch: FC = observer(() => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('active')}</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#767577" }}
                thumbColor={isEnabled ? colors.activeColor : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled} />
        </View>
    );
});
