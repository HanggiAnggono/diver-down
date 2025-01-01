import React from 'react';
import {ComponentPropsWithoutRef} from 'react';
import {Text} from '~/components/ui/text';
import {Text as MotiText} from 'moti';
import {cn} from '~/lib/utils';
import {View} from 'react-native';

type Props = ComponentPropsWithoutRef<typeof Text> & {
  wrapperClassName?: string;
};

export function TextAnimated(props: Props) {
  const children = props.children as string;
  const texts = (children || '').split(' ');

  return (
    <View
      key={Math.random()}
      className={cn('flex flex-row flex-wrap', props.wrapperClassName)}>
      {texts.map((text, index) => (
        <MotiText
          key={index}
          className={cn('text-foreground', props.className)}
          from={{opacity: 0, translateX: 10}}
          animate={{opacity: 1, translateX: 0}}
          transition={{
            type: 'timing',
            duration: 200,
            delay: index * 10,
          }}>
          {text}{' '}
        </MotiText>
      ))}
    </View>
  );
}
