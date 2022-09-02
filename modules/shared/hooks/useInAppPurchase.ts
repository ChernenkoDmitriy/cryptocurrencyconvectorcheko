import { useEffect } from 'react';
import { EmitterSubscription, Platform } from 'react-native';
import IAP, { Purchase, useIAP } from 'react-native-iap';
import { purchaseModel } from '../entities/purchase/purchaseModel';
import { validateReceipt } from '../useCases/receiptValidation';

const productIds = Platform.select({
    ios: [],
    android: ['information_service_product', 'test_subscription']
});

let purchaseUpdate: EmitterSubscription

export const useInAppPurchase = () => {
    const {
        connected,
        subscriptions,
        getSubscriptions,
        requestSubscription,
        getPurchaseHistories,
        finishTransaction,
        currentPurchase,
        purchaseHistories,
    } = useIAP();

    useEffect(() => {
        if (connected) {
            getSubscriptions(productIds as string[]);
            getPurchaseHistories();
        }
    }, [connected]);

    useEffect(() => {
        const notificationProduct = purchaseHistories?.find((item: { productId: string; }) => item.productId === 'information_service_product')
        const receipt = notificationProduct?.transactionReceipt
        if (receipt) {
            validateReceipt(JSON.parse(receipt))
        }
    }, [purchaseHistories]);

    useEffect(() => {
        purchaseUpdate = IAP.purchaseUpdatedListener((purchase) => {
            validateReceipt(purchase)
        })

        return () => {
            purchaseUpdate.remove();
        }
    }, []);

    useEffect(() => {
        const notificationProduct = subscriptions?.find((item: { productId: string; }) => item.productId === 'information_service_product');
        if (notificationProduct?.freeTrialPeriodAndroid && purchaseHistories?.length === 0) {
            purchaseModel.isFreePeriod = true
        } else {
            purchaseModel.isFreePeriod = false
        }
    }, [purchaseHistories, subscriptions]);

    const purchaseNotifications = async () => {
        const notificationProduct = subscriptions?.find((item: { productId: string; }) => item.productId === 'information_service_product');
        if (notificationProduct) {
            const response = await requestSubscription(notificationProduct.productId);
        }
    };

    useEffect(() => {
        const checkCurrentPurchase = async (purchase?: Purchase): Promise<void> => {
            if (purchase) {
                const receipt = purchase.transactionReceipt;
                if (receipt)
                    try {
                        validateReceipt(JSON.parse(receipt))
                        const ackResult = await finishTransaction(purchase, false);
                    } catch (ackErr) {
                    }
            }
        };
        checkCurrentPurchase(currentPurchase);
    }, [currentPurchase, finishTransaction]);

    return { connected, purchaseNotifications, getPurchaseHistories };
};