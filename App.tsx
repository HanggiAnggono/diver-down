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
import {Flex} from '~/components/ui/flex';
import {Text} from '~/components/ui/text';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Flex className="flex-col gap-2 p-2">
        <Button>
          <Text>Button</Text>
        </Button>
        <Button className="bg-secondary">
          <Text className="text-secondary-foreground">Button</Text>
        </Button>
        <Button className="bg-accent">
          <Text className="text-accent-foreground">Button</Text>
        </Button>
        <Button className="bg-destructive">
          <Text>Button</Text>
        </Button>
        <Button className="bg-muted">
          <Text className="text-muted-foreground">Button</Text>
        </Button>
        <Button className="bg-primary">
          <Text>Button</Text>
        </Button>
        <Button className="bg-foreground">
          <Text>Button</Text>
        </Button>
      </Flex>
    </SafeAreaView>
  );
}

export default App;
