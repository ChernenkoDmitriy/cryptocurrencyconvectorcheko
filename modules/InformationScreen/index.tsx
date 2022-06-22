import React, { FC, useMemo } from 'react';
import { useUiContext } from '../../src/UIProvider';
import { HeaderWithBackButton } from '../shared/ui/headerWithBackButton';
import { ScreenContainer } from '../shared/ui/screenContainer';
import { InfoBlock } from './components/infoBlock';
import { getStyle } from './styles';

export const InformationScreen: FC = ({ }) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    return (
        <ScreenContainer scrollEnabled>
            <HeaderWithBackButton title={t('information')} />
            <InfoBlock question={t('infoQuestion1')} answer={t('infoAnswer1')} />
            <InfoBlock question={t('infoQuestion2')} answer={t('infoAnswer2')} />
            <InfoBlock question={t('infoQuestion3')} answer={t('infoAnswer3')} />
            <InfoBlock question={t('infoQuestion4')} answer={t('infoAnswer4')} />
            <InfoBlock question={t('infoQuestion5')} answer={t('infoAnswer5')} />
            <InfoBlock question={t('infoQuestion6')} answer={t('infoAnswer6')} />
            <InfoBlock question={t('infoQuestion7')} answer={t('infoAnswer7')} />
        </ScreenContainer>
    );
};
