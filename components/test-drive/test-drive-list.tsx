import {useNavigation} from '@react-navigation/native';
import {MotiView} from 'moti';
import React from 'react';
import {FlatList, Image, Pressable} from 'react-native';
import {Flex} from '~/components/ui/flex';
import {H3, H4} from '~/components/ui/typography';
import {groupBy} from '~/lib/utils';
import {UseNavigation} from '~/navigation';
import {getTestDriveUnits} from '~/services/test-drive-services';

type Props = {
  testDrives: Awaited<ReturnType<typeof getTestDriveUnits>>;
};

export function TestDriveList(props: Props) {
  const navigation = useNavigation<UseNavigation>();
  const unitsByModel = groupBy(props.testDrives, unit => {
    return unit.modelId;
  });

  const handlePress = (unit: Props['testDrives'][0]) => () => {
    navigation.navigate('TestDrive', {modelId: unit.modelId});
  };

  return Object.entries(unitsByModel).length > 0 ? (
    <FlatList
      data={Object.entries(unitsByModel)}
      keyExtractor={([index, v]) => v[0].id + index}
      numColumns={2}
      contentContainerClassName="gap-4 p-4"
      columnWrapperClassName="gap-4 mx-auto"
      renderItem={({item: [key, value], index}) => {
        const unit = value[0];
        return (
          <Pressable
            className="h-[45vw] w-[45vw] scale-100 active:scale-90"
            onPress={handlePress(unit)}>
            <MotiView
              key={unit.id + index}
              from={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{type: 'timing', delay: index * 50}}
              className="relative overflow-hidden rounded-xl">
              <Image
                source={{uri: unit.model?.imageUrl}}
                resizeMode="cover"
                className="absolute h-full w-full"
              />
              <Flex className="size-full flex-col items-end justify-end bg-black/30 px-4">
                <Image
                  source={{uri: unit.model.brand?.imageUrl}}
                  resizeMode="contain"
                  className="mb-auto size-20 rounded-full"
                  fadeDuration={1000}
                />
                <H3 className="font-semibold text-foreground">
                  {unit.model?.brand?.name} {unit.model?.name}
                </H3>
                <H4 className="text-foreground">Available: {value.length}</H4>
              </Flex>
            </MotiView>
          </Pressable>
        );
      }}
    />
  ) : null;
}
