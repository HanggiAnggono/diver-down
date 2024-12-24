import * as React from 'react';
import {View} from 'react-native';
import {Button} from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import {Label} from '~/components/ui/label';
import {
  RadioGroup,
  RadioGroupItem as RadioGroupItem,
} from '~/components/ui/radio-group';
import {Text} from '~/components/ui/text';
import {useColorScheme} from '~/lib/useColorScheme';

function ThemeSwitcherDialog({children}: {children: React.ReactNode}) {
  const {colorScheme, setColorScheme} = useColorScheme();
  const [theme, setTheme] = React.useState(colorScheme || 'light');

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline">
            <Text>Switch Theme</Text>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[20rem]">
        <DialogHeader>
          <DialogTitle>Switch Theme</DialogTitle>
        </DialogHeader>
        <RadioGroup value={theme} onValueChange={setTheme}>
          {['light', 'dark'].map(value => {
            return (
              <View
                key={value}
                className="mb-4 flex flex-row items-center gap-2">
                <RadioGroupItem
                  aria-labelledby={`label-for-${value}`}
                  value={value}
                />
                <Label
                  nativeID={`label-for-${value}`}
                  onPress={_ => setTheme(value)}>
                  {value}
                </Label>
              </View>
            );
          })}
        </RadioGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button onPress={() => setColorScheme(theme)}>
              <Text>OK</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ThemeSwitcherDialog;
