/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import './global.css';

import React, {useEffect} from 'react';
import {View} from 'react-native';
import Navigation from '~/navigation';
import {Provider} from 'react-redux';
import store from './store/store';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import {useColorScheme} from '~/lib/useColorScheme';
import {PortalHost} from '@rn-primitives/portal';

function App(): React.JSX.Element {
  const {colorScheme, setColorScheme} = useColorScheme();

  useEffect(() => {
    if (colorScheme === undefined) {
      setColorScheme('light');
    }
  }, [colorScheme, setColorScheme]);

  return (
    <Provider store={store}>
      <View className="flex-1">
        <Navigation />
      </View>
      <PortalHost />
    </Provider>
  );
}

export default App;
