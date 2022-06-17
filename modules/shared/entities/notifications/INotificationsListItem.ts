export interface INotificationsListItem {
    id: string;
    coin: string;
    priceUp: string | null;
    priceDown: string | null;
    isActive: boolean;
}