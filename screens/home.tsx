import React from 'react';
import {View} from 'react-native';
import {TestDriveList} from '~/components/test-drive/test-drive-list';
import {Flex} from '~/components/ui/flex';
import {LoadingIndicator} from '~/components/ui/loading-indicator';
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
      <TestDriveList models={testDrives} />
    </View>
  );
}
