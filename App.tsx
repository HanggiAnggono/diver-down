/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import './global.css';

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Button} from '~/components/ui/button';
import {Text} from '~/components/ui/text';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Text className="text-6xl">App.tsx</Text>
      <Button>
        <Text>Button</Text>
      </Button>
      <Text className="p-4 pt-10 text-6xl text-primary">App.tsx</Text>
    </SafeAreaView>
  );
}

export default App;
