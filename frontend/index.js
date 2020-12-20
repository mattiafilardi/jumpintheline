import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  SupermarketDetailScreen,
  PrenotationList,
  PrenotationScreen
} from './screens';

const Router = createStackNavigator(
  {
    LoginScreen,
    RegisterScreen,
    HomeScreen,
    SupermarketDetailScreen,
    PrenotationList,
    PrenotationScreen
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);