import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';
import { View, Text } from 'react-native';
import { useUiContext } from '../../../../src/UIProvider';
import { getStyle } from './styles';

interface IProps {
    question: string;
    answer: string;
}

export const InfoBlock: FC<IProps> = observer(({ question, answer }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    return (
        <View style={styles.container}>
            <Text style={styles.questionText}>{question}</Text>
            <Text style={styles.answerText}>{answer}</Text>
        </View>
    );
});
