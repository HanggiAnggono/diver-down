import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import React, {useCallback, useMemo, useState} from 'react';
import {ScrollView, View} from 'react-native';
import Page from '~/components/page';
import {Notifications} from '~/components/test-drive/notifications';
import {TestDriveOverview} from '~/components/test-drive/overview';
import {Calendar} from '~/components/ui/calendar';
import {Separator} from '~/components/ui/separator';
import {P} from '~/components/ui/typography';
import {ScreenProps, UseNavigation} from '~/navigation';
import {useAppDispatch, useAppSelector} from '~/store/store';
import {setDay} from '~/store/test-drive-slice';
import {
  useGetCurrentUserQuery,
  useGetUnitByIdQuery,
  useSaveTestDriveMutation,
} from '~/store/api-slice';
import {getRandomDatesInNextTwoWeeks} from '~/lib/utils';
import dayjs from 'dayjs';
import {TestDriveStatus} from '~/services';
import {Button} from '~/components/ui/button';
import AlertDialogComponent, {
  useAlertDialog,
} from '~/components/ui/alert-dialog';

export default function TestDriveSchedule(
  props: ScreenProps<'TestDriveSchedule'>,
) {
  const {unitId} = props.route.params;
  const {data: unit, isLoading, error} = useGetUnitByIdQuery(unitId);
  const navigation = useNavigation<UseNavigation>();
  const dispatch = useAppDispatch();
  const day = useAppSelector(state => state.testDrive.day);
  const [saveTestDrive, {isLoading: isSaving}] = useSaveTestDriveMutation();
  const {data: user} = useGetCurrentUserQuery({});
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const {alertDialog, alertProps} = useAlertDialog();

  const [availableDates, today] = useMemo(() => {
    return [getRandomDatesInNextTwoWeeks(), dayjs().format('YYYY-MM-DD')];
  }, []);

  const handleSave = useCallback(() => {
    if (!day) {
      return;
    }
    saveTestDrive({
      unitId,
      date: day,
      status: TestDriveStatus.PENDING,
      userId: user?.id ?? '',
    }).then(() => {
      navigation.dispatch(state => {
        const routes = state.routes.filter(r => {
          return r.name !== 'TestDriveSchedule' && r.name !== 'TestDrive';
        });

        routes.push({name: 'SuccessBook', key: 'SuccessBook'});

        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        });
      });
    });
  }, [day, user?.id, saveTestDrive, unitId, navigation]);

  const renderSaveButton = useCallback(() => {
    return (
      <Button
        className="!h-10 !py-0"
        disabled={isSaving || !day}
        onPress={() => {
          alertDialog({
            title: 'Book Test Drive',
            description: 'Are you sure you want to book this test drive?',
            cancelText: 'Cancel',
            confirmText: 'Book',
            onConfirm: handleSave,
          });
        }}>
        <P>Book</P>
      </Button>
    );
  }, [isAlertDialogOpen, isSaving, day, handleSave]);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerRight: () => renderSaveButton(),
      });
    }, [navigation, renderSaveButton]),
  );

  return (
    <Page title="Schedule Test Drive">
      <ScrollView contentContainerClassName="py-32 p-4">
        <P className="mb-4">
          Ready to take it for a spin? Pick a date that works best for you and
          let's go!
        </P>
        <View>
          <Calendar
            onDayPress={day => {
              dispatch(setDay(day.dateString));
            }}
            markedDates={{
              ...availableDates.reduce((acc, date, i) => {
                return {
                  ...acc,
                  [date]: {disabled: false},
                };
              }, {}),
              [today]: {disabled: true},
              ...(day && {
                [day]: {selected: true, disabled: false},
              }),
            }}
          />
        </View>
        <Notifications />
        <Separator className="my-4" />
        <TestDriveOverview unit={unit} />
      </ScrollView>
      <AlertDialogComponent {...alertProps} isLoading={isSaving} />
    </Page>
  );
}
