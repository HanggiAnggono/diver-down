import React, {useEffect} from 'react';
import {
  CompositeNavigationProp,
  NavigationContainer,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import Home from '~/screens/home';
import Onboarding from '~/screens/onboarding';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import TestDrive from '~/screens/test-drive';
import {useColorScheme} from '~/lib/useColorScheme';
import {BlurView} from '@react-native-community/blur';
import {StyleSheet} from 'react-native';

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  TestDrive: {
    modelId: string;
  };
};

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type UseNavigation<T extends keyof RootStackParamList = 'Home'> =
  CompositeNavigationProp<
    NativeStackNavigationProp<RootStackParamList, T>,
    NativeStackNavigationProp<RootStackParamList>
  >;

const Stack = createNativeStackNavigator<RootStackParamList>();

const Header = () => {
  return (
    <BlurView
      id="01J-lp-oVM"
      blurType="regular"
      blurAmount={100}
      style={StyleSheet.absoluteFill}
    />
  );
};

function RootStack() {
  const {colorScheme} = useColorScheme();

  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{
        headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
        headerTransparent: true,
        headerBackground: Header,
      }}>
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />

      <Stack.Screen name="TestDrive" component={TestDrive} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
