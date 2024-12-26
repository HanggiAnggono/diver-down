import React, {useState} from 'react';
import {View} from 'react-native';
import {Button} from '~/components/ui/button';
import {Card} from '~/components/ui/card';
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
import {RadioGroupItem} from '~/components/ui/radio-group';
import {RadioGroup} from '~/components/ui/radio-group';
import {Separator} from '~/components/ui/separator';
import {Text} from '~/components/ui/text';
import {H2, P} from '~/components/ui/typography';
import {AlarmClockIcon, Trash2Icon} from '~/lib/icons';
import {uniqueArray} from '~/lib/utils';

export function Notifications() {
  const [notifications, setNotifications] = useState<
    Array<{day: number; time: string}>
  >([]);

  const [formState, setFormState] = useState<{
    day: number | null;
    time: string | null;
  }>({
    day: null,
    time: '',
  });

  function handleSubmit() {
    if (!formState.day || !formState.time) {
      return;
    }

    setNotifications(
      uniqueArray([
        ...notifications,
        {day: formState.day, time: formState.time},
      ]),
    );

    setFormState({
      day: null,
      time: '',
    });
  }

  function handleDelete(index: number) {
    return () => {
      setNotifications(notifications.filter((_, i) => i !== index));
    };
  }

  return (
    <View className="my-4 flex flex-col gap-2">
      <H2 className="border-0">Notifications</H2>
      <P>Receive notifications for test drive updates.</P>

      {notifications.map((notification, index) => (
        <Card
          key={index}
          className="flex flex-row items-center justify-between p-2">
          <P>
            {notification.day} days before, {notification.time}
          </P>
          <Button variant="ghost" onPress={handleDelete(index)}>
            <Trash2Icon className="text-destructive" />
          </Button>
        </Card>
      ))}

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="my-4 flex flex-row items-center gap-2">
            <Text className="!text-primary">Add Notification</Text>
            <AlarmClockIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[20rem]">
          <DialogHeader>
            <DialogTitle>Add Notification</DialogTitle>
          </DialogHeader>
          <View>
            <P className="mb-4">Get Reminded So You Don't Miss It</P>
            <RadioGroup
              value={formState.day?.toString()}
              onValueChange={value =>
                setFormState({day: Number(value), time: ''})
              }>
              {[3, 2, 1].map(value => {
                return (
                  <View
                    key={value}
                    className="mb-4 flex flex-row items-center gap-2">
                    <RadioGroupItem
                      aria-labelledby={`label-for-${value}`}
                      value={value.toString()}
                    />
                    <Label
                      nativeID={`label-for-${value}`}
                      onPress={_ =>
                        setFormState({day: value, time: formState.time})
                      }>
                      <Text>{value} Days before</Text>
                    </Label>
                  </View>
                );
              })}
            </RadioGroup>

            <Separator className="my-4" />

            <RadioGroup
              value={formState.time?.toString()}
              onValueChange={value =>
                setFormState({day: formState.day, time: value})
              }>
              {['morning', 'afternoon', 'evening'].map(value => {
                return (
                  <View
                    key={value}
                    className="mb-4 flex flex-row items-center gap-2">
                    <RadioGroupItem
                      aria-labelledby={`label-for-${value}`}
                      value={value.toString()}
                    />
                    <Label
                      nativeID={`label-for-${value}`}
                      onPress={_ =>
                        setFormState({day: formState.day, time: value})
                      }>
                      <Text>{value}</Text>
                    </Label>
                  </View>
                );
              })}
            </RadioGroup>
          </View>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                onPress={handleSubmit}
                disabled={!formState.day || !formState.time}>
                OK
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </View>
  );
}
