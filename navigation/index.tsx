import React from 'react';
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
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '~/screens/profile';
import {Header} from '~/navigation/header';
import {TabBar} from '~/navigation/tab-bar';
import TestDriveSchedule from '~/screens/test-drive-schedule';
import SuccessBook from '~/screens/success-book';
import MyTestDrive from '~/screens/my-test-drive';

export type RootStackParamList = {
  Onboarding: undefined;
  HomeTab: undefined;
  TestDrive: {
    modelId: string;
  };
  TestDriveSchedule: {
    unitId: string;
  };
  SuccessBook: undefined;
  MyTestDrive: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type UseNavigation<T extends keyof RootStackParamList = 'HomeTab'> =
  CompositeNavigationProp<
    NativeStackNavigationProp<RootStackParamList, T>,
    NativeStackNavigationProp<RootStackParamList>
  >;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator();

function RootStack() {
  const {colorScheme} = useColorScheme();

  return (
    <Stack.Navigator
      id={undefined}
      initialRouteName="Onboarding"
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
        name="HomeTab"
        component={HomeTab}
        options={{headerShown: false, headerTitle: 'Home'}}
      />

      <Stack.Screen
        name="TestDrive"
        component={TestDrive}
        options={{headerTitle: '', title: ''}}
      />

      <Stack.Screen
        name="TestDriveSchedule"
        component={TestDriveSchedule}
        options={{headerTitle: '', title: ''}}
      />

      <Stack.Screen
        name="SuccessBook"
        component={SuccessBook}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function HomeTab() {
  return (
    <Tabs.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen
        name="MyTestDrive"
        component={MyTestDrive}
        options={{title: 'Test Drives'}}
      />
      <Tabs.Screen name="Profile" component={Profile} />
    </Tabs.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
