import {View} from 'react-native';
import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {MotiView, Text} from 'moti';
import {PlatformPressable} from '@react-navigation/elements';
import {useLinkBuilder} from '@react-navigation/native';
import {CarIcon, ListTodoIcon, UserCogIcon} from '~/lib/icons';
import {cn} from '~/lib/utils';

const IconMap = {
  Home: CarIcon,
  MyTestDrive: ListTodoIcon,
  Profile: UserCogIcon,
};

export function TabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const {buildHref} = useLinkBuilder();
  return (
    <View className="flex h-24 flex-row items-stretch justify-stretch bg-background">
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const Icon = IconMap[route.name as keyof typeof IconMap];

        return (
          <PlatformPressable
            href={buildHref(route.name, route.params)}
            key={route.key}
            onPress={onPress}
            className="flex-1 items-center justify-center">
            <View className="flex flex-col items-center justify-center">
              <View className="relative mb-2 flex items-center justify-center">
                <Icon
                  className={cn(
                    'z-10 text-foreground',
                    isFocused ? 'fill-foreground' : 'fill-none',
                  )}
                  size={24}
                />
                <MotiView
                  className="absolute h-full w-1/3 rounded-full bg-primary p-5"
                  from={{scaleX: 0}}
                  animate={{
                    scaleX: isFocused ? 1 : 0,
                  }}
                  transition={{
                    type: 'timing',
                    duration: 100,
                  }}
                />
              </View>
              <Text className="text-foreground">{label}</Text>
            </View>
          </PlatformPressable>
        );
      })}
    </View>
  );
}
