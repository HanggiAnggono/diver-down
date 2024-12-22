import React from 'react';
import {FlatList, Image, ImageBackground, View} from 'react-native';
import {Card, CardContent} from '~/components/ui/card';
import {Flex} from '~/components/ui/flex';
import {Text} from '~/components/ui/text';
import {H1, H3, H4} from '~/components/ui/typography';
import {formatDate, groupBy} from '~/lib/utils';
import {useGetTestDrivesQuery} from '~/store/api-slice';

export default function Home() {
  const {data: testDrives = [], error, isLoading} = useGetTestDrivesQuery({});

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error fetching cars: {error.message}</Text>;
  }

  const testDrivesByModel = groupBy(testDrives, td => {
    return td.model?.id;
  });

  return (
    <View className="flex-1 bg-primary pt-14">
      <FlatList
        data={Object.entries(testDrivesByModel)}
        keyExtractor={([, v]) => v[0].id}
        numColumns={2}
        contentContainerClassName="gap-2 px-4"
        columnWrapperClassName="gap-2"
        renderItem={({item: [key, value]}) => {
          const testDrive = value[0];
          return (
            <View className="h-[50vw] w-1/2">
              <ImageBackground
                source={{uri: testDrive.model?.imageUrl}}
                resizeMode="cover"
                className="overflow-hidden rounded-xl">
                <Flex className="size-full flex-col items-end justify-end bg-foreground/30 p-4">
                  <H3 className="font-semibold text-primary-foreground">
                    {testDrive.model?.name}
                  </H3>
                  <H4 className="text-primary-foreground">
                    Available: {value.length}
                  </H4>
                </Flex>
              </ImageBackground>
            </View>
          );
        }}
      />
    </View>
  );
}
