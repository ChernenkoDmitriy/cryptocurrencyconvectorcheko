import { requester } from "../../../libraries/requester";
import { purchaseModel } from "../entities/purchase/purchaseModel";

const validateReceiptResponse = async (receipt: any) => {
    const url = 'https://cryptocurrencyconvectorchekojs.herokuapp.com/purchase';
    const data = {
        appType: "android",
        productId: receipt.productId,
        purchaseToken: receipt.purchaseToken,
        purchaseTime: receipt.purchaseTime,
        quantity: receipt.quantity,
        developerPayload: receipt.developerPayload
    }
    const response = await requester.post(url, data);
    return response
}

export const validateReceipt = async (receipt: any) => {
    const response = await validateReceiptResponse(receipt)
    if (response.status === 201) {
        purchaseModel.isPurchased = response.data.isSubscriptionActive
    } else {
        purchaseModel.isPurchased = false
    }
    return response
} 