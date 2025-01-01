import React from 'react';
import {Pressable, View} from 'react-native';
import Page from '~/components/page';
import {AvatarImage} from '~/components/ui/avatar';
import {AvatarFallback} from '~/components/ui/avatar';
import {Avatar} from '~/components/ui/avatar';
import {Flex} from '~/components/ui/flex';
import {Text} from '~/components/ui/text';
import ThemeSwitcherDialog from '~/components/ui/theme-switcher-dialog';
import {ChevronRightIcon} from '~/lib/icons';

export default function Profile() {
  return (
    <Page title="Profile" className="pt-20">
      <View className="mb-10 items-center justify-center gap-2">
        <Avatar alt="Avatar" className="h-20 w-20">
          <AvatarImage
            source={{
              uri: 'https://picsum.photos/140/140',
              scale: 2,
            }}
          />
          <AvatarFallback>
            <Text className="text-card-foreground">AB</Text>
          </AvatarFallback>
        </Avatar>
        <View className="flex flex-col items-center gap-1">
          <Text className="font-semibold">Abdul Rehman</Text>
          <Text className="text-muted-foreground">abdulrehman@me.com</Text>
        </View>
      </View>
      <Flex className="flex-col gap-2">
        <MenuItem label="About" />
        <ThemeSwitcherDialog>
          <Pressable className="flex w-full flex-row justify-between bg-card p-4 active:bg-card/50">
            <Text>Appearance</Text>
            <ChevronRightIcon className="text-card-foreground" />
          </Pressable>
        </ThemeSwitcherDialog>
        <MenuItem label="Privacy" />
      </Flex>
    </Page>
  );
}

const MenuItem = ({label}: {label?: string}) => {
  return (
    <Pressable className="flex w-full flex-row justify-between bg-card p-4 active:bg-card/50">
      <Text>{label}</Text>
      <ChevronRightIcon className="text-card-foreground" />
    </Pressable>
  );
};
