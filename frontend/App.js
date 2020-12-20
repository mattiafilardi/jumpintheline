import React from 'react';
import { Provider } from 'react-native-paper';
import App from './index';
import { theme } from './utility/theme';

const Main = () => (
  <Provider theme={theme}>
    <App />
  </Provider>
);

export default Main;
