import { observer } from 'mobx-react';
import React, { Dispatch, FC, SetStateAction, useMemo } from 'react';
import { Text, View, Switch } from 'react-native'
import { getStyle } from './styles';
import { useUiContext } from '../../../../../src/UIProvider';

interface IProps {
    isEnabled: boolean;
    setIsEnabled: Dispatch<SetStateAction<boolean>>
}

export const NotificationActiveSwitch: FC<IProps> = observer(({ isEnabled, setIsEnabled }) => {
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('active')}</Text>
            <Switch
                trackColor={{ false: colors.inputBackground, true: colors.inputBackground }}
                thumbColor={isEnabled ? colors.activeColor : colors.regularText}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled} />
        </View>
    );
});
