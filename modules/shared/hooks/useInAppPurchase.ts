import { useEffect } from 'react';
import { Purchase, useIAP } from 'react-native-iap';
import { purchaseModel } from '../entities/purchase/purchaseModel';

const productIds = ['information_service_product', 'test_subscription'];

export const useInAppPurchase = () => {
    const {
        connected,
        subscriptions,
        getSubscriptions,
        requestSubscription,
        getPurchaseHistory,
        finishTransaction,
        currentPurchase,
        purchaseHistory,
    } = useIAP();

    useEffect(() => {
        if (purchaseHistory) {
            purchaseModel.purchaseHistory = purchaseHistory;
        }
    }, [purchaseHistory]);

    useEffect(() => {
        if (connected) {
            getSubscriptions({ skus: productIds });
            getPurchaseHistory();
        }
    }, [connected]);

    const purchaseNotifications = async () => {
        const notificationProduct = subscriptions?.find(item => item.productId === 'information_service_product');
        if (notificationProduct) {
            const response = await requestSubscription({ sku: notificationProduct.productId, ...(notificationProduct?.subscriptionOfferDetails[0]?.offerToken && { subscriptionOffers: [{ sku: notificationProduct.productId, offerToken: notificationProduct?.subscriptionOfferDetails[0]?.offerToken }] }), });
        }
    };

    useEffect(() => {
        const checkCurrentPurchase = async (purchase?: Purchase): Promise<void> => {
            if (purchase) {
                const receipt = purchase.transactionReceipt;
                if (receipt)
                    try {
                        const ackResult = await finishTransaction({ purchase, isConsumable: false });
                    } catch (ackErr) {
                    }
            }
        };
        checkCurrentPurchase(currentPurchase);
    }, [currentPurchase, finishTransaction]);

    return { connected, purchaseNotifications, getPurchaseHistory, purchaseHistory };
};

const tes = {
    developerPayload: '',
    signatureAndroid:
        'as2p7T8IB0BQd17RVe8Nk5vgtqCVlKFzKQMz9OBJ0kt5QhT3nSTc4TAo+P9WWCUt95zABLGOO8a90unNus8aSW1Cka415pabUG6/mDTLB4paIeo/YTX5nFXN4IS0gUoNBsBB8K3BWv5tDVO6reAFUUkqplilXj9Z2jUzMtBFwlBQpPN5FicbSWHZSucjSnb5oKo5HIadkEc45h9949aAmCi2I3UIdiXOZnrHsjME6Mh2r5sNNKnD32axgzwc2e/CChtfYXb/kGDFO3ePSCRr4j25FJrjWKXt/a0OJ7F9jCDbGU1+JIY3zlqPVF1WnNFUYYjqZLUwNsnheURucT/33g==',
    purchaseToken:
        'jemgecmmllpebgjioobejkdg.AO-J1OzzEKT9yu-0A7EGlyCXvo5kNpoKCctjerlmo2iAifa2T-K9gy6R2ov-yaiSt7vKyFfAo3-O1uN256lzQonz6MTiMcbdY7kctQFyeMPeidYrjapp5lw',
    transactionReceipt:
        '{"productId":"test_subscription","purchaseTime":1659888748115,"purchaseToken":"jemgecmmllpebgjioobejkdg.AO-J1OzzEKT9yu-0A7EGlyCXvo5kNpoKCctjerlmo2iAifa2T-K9gy6R2ov-yaiSt7vKyFfAo3-O1uN256lzQonz6MTiMcbdY7kctQFyeMPeidYrjapp5lw","quantity":1}',
    dataAndroid:
        '{"productId":"test_subscription","purchaseTime":1659888748115,"purchaseToken":"jemgecmmllpebgjioobejkdg.AO-J1OzzEKT9yu-0A7EGlyCXvo5kNpoKCctjerlmo2iAifa2T-K9gy6R2ov-yaiSt7vKyFfAo3-O1uN256lzQonz6MTiMcbdY7kctQFyeMPeidYrjapp5lw","quantity":1}',
    transactionDate: 1659888748115,
    productId: 'test_subscription',
}