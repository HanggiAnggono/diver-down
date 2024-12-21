import React from 'react';
import {PropsWithChildren} from 'react';
import {View} from 'react-native';
import {cn} from '~/lib/utils';

export function Flex({
  children,
  ...props
}: PropsWithChildren<{className?: string}>) {
  return (
    <View {...props} className={cn('flex', props.className)}>
      {children}
    </View>
  );
}
