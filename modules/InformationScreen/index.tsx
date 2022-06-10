import React, { FC, useMemo } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useUiContext } from '../../src/UIProvider';
import { Header } from '../components/header';
import { InfoBlock } from '../components/infoBlock';
import { getStyle } from './styles';

export const InformationScreen: FC = ({ }) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Header title={t('information')} />
            <InfoBlock question={t('infoQuestionLink')} answer={t('infoAnswerLink')} />
            <InfoBlock question={t('infoQuestionAutonom')} answer={t('infoAnswerAutonom')} />
            <InfoBlock question={t('infoQuestionUpdate')} answer={t('infoAnswerUpdate')} />
            <InfoBlock question={t('infoQuestionOtherResources')} answer={t('infoAnswerOtherResources')} />
            <InfoBlock question={t('infoQuestionOtherOtherSitesLink')} answer={t('infoAnswerOtherSitesLink')} />
            <InfoBlock question={t('infoQuestionContactUs')} answer={t('infoAnswerContactUs')} />
        </ScrollView>
    );
};
