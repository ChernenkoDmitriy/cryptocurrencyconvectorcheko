import React, { FC, useMemo, memo, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { LanguageIcon } from '../../../../assets/languageIcon';
import { useUiContext } from '../../../../src/UIProvider';
import { SettingButton } from '../settingButton';
import { SettingListRadioItem } from '../settingListRadioItem';
import { getStyle } from './styles';

interface IProps {
    onChangeLanguage: (value: string) => void;
}

export const ChoseLanguage: FC<IProps> = memo(({ onChangeLanguage }) => {
    const [isVisible, setIsVisible] = useState(false);
    const { colors, t, locales, locale } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    const onOpenModal = () => {
        setIsVisible(true);
    }

    const onCloseModal = () => {
        setIsVisible(false);
    }

    const renderItem = ({ item }: { item: string }) => {
        const onHandleChangeLanguage = () => onChangeLanguage(item);
        return <SettingListRadioItem text={t(item)} isChosen={locale === item} onPress={onHandleChangeLanguage} />
    }

    const keyExtractor = (item: string, index: number) => item + index;

    return (
        <>
            <SettingButton icon={<LanguageIcon color={colors.icon} />} title={t('language')} description={t(locale)} onPress={onOpenModal} />
            <ReactNativeModal
                backdropOpacity={0.5}
                swipeDirection={'down'}
                style={styles.modal}
                isVisible={isVisible}
                onSwipeComplete={onCloseModal}
                onBackdropPress={onCloseModal}
            >
                <View style={styles.container}>
                    <View style={styles.modalIndicator}/>
                    <Text style={styles.title}>{t('language')}</Text>
                    <FlatList keyExtractor={keyExtractor} renderItem={renderItem} data={locales} />
                </View>
            </ReactNativeModal>
        </>
    );
});
