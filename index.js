import 'react-native-url-polyfill/auto'; // <- deve ser a PRIMEIRA importação
import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);
