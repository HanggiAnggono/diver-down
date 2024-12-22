import {MotiImage, MotiView, motify} from 'moti';
import React from 'react';
import {FlatList, View, ImageBackground, Image} from 'react-native';
import {Flex} from '~/components/ui/flex';
import {H3, H4} from '~/components/ui/typography';
import {groupBy} from '~/lib/utils';
import {getTestDrives} from '~/services/test-drive-services';

type Props = {
  testDrives: Awaited<ReturnType<typeof getTestDrives>>;
};

const MotiImgBg = motify(ImageBackground)();

export function TestDriveList(props: Props) {
  const testDrivesByModel = groupBy(props.testDrives, td => {
    return td.model?.id;
  });

  return Object.entries(testDrivesByModel).length > 0 ? (
    <FlatList
      data={Object.entries(testDrivesByModel)}
      keyExtractor={([index, v]) => v[0].id + index}
      numColumns={2}
      contentContainerClassName="gap-2 px-4"
      columnWrapperClassName="gap-2"
      renderItem={({item: [key, value], index}) => {
        const testDrive = value[0];
        return (
          <View className="h-[50vw] w-1/2">
            <MotiView
              key={testDrive.id + index}
              from={{scale: 1.1, opacity: 0}}
              animate={{scale: 1, opacity: 1}}
              transition={{type: 'timing', delay: index * 50}}
              className="relative">
              <Image
                source={{uri: testDrive.model?.imageUrl}}
                resizeMode="cover"
                className="absolute h-full w-full overflow-hidden rounded-xl"
              />
              <Flex className="size-full flex-col items-end justify-end bg-black/30 p-4">
                <H3 className="font-semibold text-primary-foreground">
                  {testDrive.brand?.name} {testDrive.model?.name}
                </H3>
                <H4 className="text-primary-foreground">
                  Available: {value.length}
                </H4>
              </Flex>
            </MotiView>
          </View>
        );
      }}
    />
  ) : null;
}
