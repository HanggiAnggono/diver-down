import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  View,
} from 'react-native';
import {TestDriveList} from '~/components/test-drive/test-drive-list';
import {Card, CardContent} from '~/components/ui/card';
import {Flex} from '~/components/ui/flex';
import {LoadingIndicator} from '~/components/ui/loading-indicator';
import {Text} from '~/components/ui/text';
import {H1, H3, H4} from '~/components/ui/typography';
import {formatDate, groupBy} from '~/lib/utils';
import {useGetTestDrivesQuery} from '~/store/api-slice';

export default function Home() {
  const {data: testDrives = [], error, isLoading} = useGetTestDrivesQuery({});

  return (
    <View className="flex-1 bg-background pt-14">
      {isLoading && (
        <Flex className="flex-1 items-center justify-center">
          <LoadingIndicator className="text-2xl" />
        </Flex>
      )}
      <TestDriveList testDrives={testDrives} />
    </View>
  );
}
