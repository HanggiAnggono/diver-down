import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import Page from '~/components/page';
import {TestDriveOverview} from '~/components/test-drive/overview';
import {Calendar} from '~/components/ui/calendar';
import {Separator} from '~/components/ui/separator';
import {H1} from '~/components/ui/typography';
import {ScreenProps, UseNavigation} from '~/navigation';
import {useGetUnitByIdQuery} from '~/store/api-slice';

export default function TestDriveSchedule(
  props: ScreenProps<'TestDriveSchedule'>,
) {
  const {unitId} = props.route.params;
  const {data: unit, isLoading, error} = useGetUnitByIdQuery(unitId);
  const {setOptions, ...navigation} = useNavigation<UseNavigation>();

  useFocusEffect(
    useCallback(() => {
      setOptions({
        headerRight: () => (
          <View>
            <Pressable className="rounded-md bg-primary p-2 px-4 active:bg-primary/80">
              <Text className="text-primary-foreground">Save</Text>
            </Pressable>
          </View>
        ),
      });
    }, [setOptions]),
  );

  return (
    <Page title="Schedule Test Drive">
      <ScrollView className="p-4 pt-32">
        <View>
          <Calendar />
        </View>
        <Separator className="my-4" />
        <TestDriveOverview unit={unit} />
      </ScrollView>
    </Page>
  );
}
