export interface IMessaging {
    subscribeToTopic: (topic: string) => Promise<void>;
    requestUserPermission: () => Promise<number>;
    registerAppWithFCM: () => Promise<void>;
    getFCMToken: () => Promise<string>;
    removeFCMToken: () => Promise<void>;
    subscribeAppWithFCM: (callback: Function) => Function;
    onUpdateToken: (callback: Function) => Function;
}
