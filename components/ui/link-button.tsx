import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, ButtonProps} from '~/components/ui/button';
import {Text} from '~/components/ui/text';
import {RootStackParamList, UseNavigation} from '~/navigation';

interface Props<T extends keyof RootStackParamList> {
  to: T;
  params?: RootStackParamList[T];
  goBack?: boolean;
  children: React.ReactNode;
  _button?: ButtonProps;
}

export function LinkButton<T extends keyof RootStackParamList>({
  to,
  goBack = false,
  children,
  _button,
  params,
}: Props<T>) {
  const navigation = useNavigation<UseNavigation>();

  const handlePress = () => {
    if (goBack) {
      navigation.goBack();
    } else {
      navigation.navigate(to, params);
    }
  };

  return (
    <Button onPress={handlePress} {..._button}>
      {typeof children === 'string' ? <Text>{children}</Text> : children}
    </Button>
  );
}
