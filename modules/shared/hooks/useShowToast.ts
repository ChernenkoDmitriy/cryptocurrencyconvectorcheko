import Toast from "react-native-toast-message";
import { useUiContext } from "../../../src/UIProvider";

export const useShowToast = () => {
    const { colors, t } = useUiContext()

    const showToast = () => {
        Toast.show({
            type: 'netError',
            text1: t('toastTitle'),
            text2: t('toastSubTitle'),
            props: { colors }
        });
    }

    return { showToast };
}