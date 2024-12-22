import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, ButtonProps} from '~/components/ui/button';
import {Text} from '~/components/ui/text';

interface Props {
  to: string;
  goBack?: boolean;
  children: React.ReactNode;
  _button?: ButtonProps;
}

export function LinkButton({to, goBack = false, children, _button}: Props) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (goBack) {
      navigation.goBack();
    } else {
      navigation.navigate(to as never);
    }
  };

  return (
    <Button onPress={handlePress} {..._button}>
      {typeof children === 'string' ? <Text>{children}</Text> : children}
    </Button>
  );
}
