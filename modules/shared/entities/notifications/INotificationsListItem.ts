export interface INotificationsListItem {
    id: string;
    numberId: number;
    coin: string;
    symbol: string;
    priceUp: string | null;
    priceDown: string | null;
    comment: string | null;
    isActive: boolean;
}