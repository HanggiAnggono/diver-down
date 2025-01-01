import React from 'react';
import {AnimatePresence, MotiView} from 'moti';
import {Text} from '~/components/ui/text';
import {Flex} from '~/components/ui/flex';
import {ActivityIndicator} from 'react-native';

type Props = React.ComponentProps<typeof Text>;

export function LoadingIndicator(props: Props) {
  return (
    <Flex>
      <ActivityIndicator className="mr-2 text-foreground" />
      <AnimatePresence exitBeforeEnter>
        <MotiView
          key={Math.random()}
          from={{opacity: 1}}
          animate={{opacity: 0}}
          transition={{
            type: 'timing',
            loop: true,
            duration: 1000,
            delay: 100,
          }}>
          <Text className="text-foreground" {...props}>
            {props.children || 'Loading'}
          </Text>
        </MotiView>
      </AnimatePresence>
    </Flex>
  );
}
