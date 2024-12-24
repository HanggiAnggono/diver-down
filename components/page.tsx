import React from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import {View} from 'react-native';
import {cn} from '~/lib/utils';

export default function Page({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const {setOptions} = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setOptions({
        title,
      });
    }, [title, setOptions]),
  );

  return (
    <View className={cn('flex-1 bg-background', className)}>{children}</View>
  );
}
