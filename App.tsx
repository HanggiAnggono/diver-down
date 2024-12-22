/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import './global.css';

import React from 'react';
import {View} from 'react-native';
import Navigation from '~/navigation';
import {Provider} from 'react-redux';
import store from './store/store';
import 'react-native-reanimated';
import 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <View className="flex-1">
        <Navigation />
      </View>
    </Provider>
  );
}

export default App;
