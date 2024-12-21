/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import './global.css';

import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import Navigation from '~/navigation';

function App(): React.JSX.Element {
  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle="default" backgroundColor="#ffffff" />
      <View className="flex-1 bg-primary">
        <Navigation />
      </View>
    </SafeAreaView>
  );
}

export default App;
