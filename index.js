import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { App } from './src/App';
import { name as appName } from './app.json';
import { LogBox } from "react-native";
import messaging from '@react-native-firebase/messaging';
import { pushNotificatonUseCase } from './modules/notifications/useCases/pushNotificationsUseCase';

LogBox.ignoreLogs([
    "ViewPropTypes will be removed"
])

messaging().setBackgroundMessageHandler(pushNotificatonUseCase);

AppRegistry.registerComponent(appName, () => App);