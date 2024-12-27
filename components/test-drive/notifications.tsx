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
import {DAY_OPTIONS, TIME_OPTIONS} from '~/lib/constants';
import {AlarmClockIcon, Trash2Icon} from '~/lib/icons';
import {uniqueArray} from '~/lib/utils';
import {useAppDispatch, useAppSelector} from '~/store/store';
import {addNotification, removeNotification} from '~/store/test-drive-slice';

export function Notifications() {
  const notifications = useAppSelector(state => state.testDrive.notifications);
  const dispatch = useAppDispatch();

  const [formState, setFormState] = useState<{
    day: number | null;
    time: keyof typeof TIME_OPTIONS | null;
  }>({
    day: null,
    time: null,
  });

  function handleSubmit() {
    if (!formState.day || !formState.time) {
      return;
    }

    dispatch(
      addNotification({
        day: formState.day,
        time: formState.time,
      }),
    );

    setFormState({
      day: null,
      time: null,
    });
  }

  const handleDelete = (index: number) => () =>
    dispatch(removeNotification(index));

  return (
    <View className="my-4 flex flex-col gap-2">
      <H2 className="border-0">Notifications</H2>
      <P>Receive notifications for test drive updates.</P>

      {notifications.map((notification, index) => (
        <Card
          key={index}
          className="flex flex-row items-center justify-between p-2">
          <P>
            {notification.day} days before, {TIME_OPTIONS[notification.time]}
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
              {Object.entries(DAY_OPTIONS).map(([label, day]) => {
                return (
                  <View
                    key={day}
                    className="mb-4 flex flex-row items-center gap-2">
                    <RadioGroupItem
                      aria-labelledby={`label-for-${day}`}
                      value={day.toString()}
                    />
                    <Label
                      nativeID={`label-for-${day}`}
                      onPress={_ =>
                        setFormState({day: day, time: formState.time})
                      }>
                      <Text>{label} before</Text>
                    </Label>
                  </View>
                );
              })}
            </RadioGroup>

            <Separator className="my-4" />

            <RadioGroup
              value={formState.time?.toString()}
              onValueChange={value =>
                setFormState({
                  day: formState.day,
                  time: value as keyof typeof TIME_OPTIONS,
                })
              }>
              {Object.entries(TIME_OPTIONS).map(([value, hour]) => {
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
                      <Text>
                        {value} at {hour}
                      </Text>
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
