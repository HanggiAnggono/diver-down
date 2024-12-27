import React from 'react';
import {View} from 'react-native';
import {TestDriveList} from '~/components/test-drive/test-drive-list';
import {Flex} from '~/components/ui/flex';
import {LoadingIndicator} from '~/components/ui/loading-indicator';
import {H3, P} from '~/components/ui/typography';
import {useGetTestDriveUnitsQuery} from '~/store/api-slice';

export default function Home() {
  const {
    data: testDrives = [],
    error,
    isLoading,
  } = useGetTestDriveUnitsQuery({});

  return (
    <View className="flex-1 bg-background pt-14">
      {isLoading && (
        <Flex className="flex-1 items-center justify-center">
          <LoadingIndicator className="text-2xl" />
        </Flex>
      )}
      {testDrives.length === 0 && !isLoading ? (
        <View className="flex-1 items-center justify-center p-4">
          <H3 className="text-muted-foreground">No Available Units</H3>
          <P className="text-center">
            It seems that there are no units available for test drives. Maybe
            try another day.
          </P>
        </View>
      ) : (
        <TestDriveList models={testDrives} />
      )}
    </View>
  );
}
