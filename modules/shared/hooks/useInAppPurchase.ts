import { useEffect } from 'react';
import RNIap, { requestPurchase, Purchase, useIAP } from 'react-native-iap';
import { purchaseModel } from '../entities/purchase/purchaseModel';

const productIds = ['test_product', 'notifications'];

export const useInAppPurchase = () => {
    const {
        connected,
        products,
        getProducts,
        getPurchaseHistories,
        finishTransaction,
        currentPurchase,
        purchaseHistories,
    } = useIAP();

    useEffect(() => {
        if (purchaseHistories) {
            purchaseModel.purchaseHistory = purchaseHistories;
        }
    }, [purchaseHistories])

    useEffect(() => {
        if (connected) {
            getProducts(productIds);
            getPurchaseHistories();
        }
    }, [connected]);

    const purchaseNotifications = async () => {
        // const notificationProduct = products?.find(item => item.productId === 'test_product');
        const notificationProduct = products?.find(item => item.productId === 'notifications');
        if (notificationProduct?.type === 'inapp') {
            const response = await requestPurchase(notificationProduct.productId);
        }
    };

    useEffect(() => {
        const checkCurrentPurchase = async (purchase?: Purchase): Promise<void> => {
            if (purchase) {
                const receipt = purchase.transactionReceipt;
                if (receipt)
                    try {
                        const ackResult = await finishTransaction(purchase);
                    } catch (ackErr) {
                    }
            }
        };
        checkCurrentPurchase(currentPurchase);
    }, [currentPurchase, finishTransaction]);

    return { purchaseNotifications };
};
