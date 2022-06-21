import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { App } from './src/App';
import { name as appName } from './app.json';
import { LogBox } from "react-native";

LogBox.ignoreLogs([
    "ViewPropTypes will be removed"
])

AppRegistry.registerComponent(appName, () => App);