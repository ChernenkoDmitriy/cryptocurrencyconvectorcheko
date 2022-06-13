export interface INotificationMock {
    id: string;
    coin: string;
    priceUp: number | null;
    priceDown: number | null;
    isActive: boolean;
}

export const notificationsMock = [
    { id: '1', coin: 'binancecoin', priceUp: 10000, priceDown: 5000, isActive: false },
]