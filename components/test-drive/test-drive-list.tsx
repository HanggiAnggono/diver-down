import {useNavigation} from '@react-navigation/native';
import {MotiView} from 'moti';
import React from 'react';
import {FlatList, Image, Pressable} from 'react-native';
import {Flex} from '~/components/ui/flex';
import {H3, H4} from '~/components/ui/typography';
import {cn, groupBy} from '~/lib/utils';
import {UseNavigation} from '~/navigation';
import {getTestDriveUnits} from '~/services/test-drive-services';

type Props = {
  models: Awaited<ReturnType<typeof getTestDriveUnits>>;
};

export function TestDriveList(props: Props) {
  const navigation = useNavigation<UseNavigation>();

  const handlePress = (model: Props['models'][0]) => () => {
    navigation.navigate('TestDrive', {modelId: model.modelId});
  };

  return props.models.length > 0 ? (
    <FlatList
      data={props.models}
      keyExtractor={model => model.modelId}
      numColumns={2}
      contentContainerClassName="gap-4 p-4"
      columnWrapperClassName="gap-4"
      renderItem={({item, index}) => {
        const {
          units: [unit],
          model,
        } = item;

        return (
          <Pressable
            className="h-[45vw] w-[45vw] scale-100 overflow-hidden rounded-xl bg-card active:scale-90"
            onPress={handlePress(item)}>
            <MotiView
              key={unit.id + index}
              from={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{type: 'timing', delay: index * 50}}
              className="relative overflow-hidden">
              <Image
                source={{uri: model?.imageUrl}}
                resizeMode="cover"
                className={cn(
                  'absolute h-full w-full',
                  item.availableUnits === 0 && 'opacity-20',
                )}
              />
              <Flex className="size-full flex-col items-end justify-end bg-black/30 p-3">
                <Image
                  source={{uri: model.brand?.imageUrl}}
                  resizeMode="contain"
                  className="mb-auto size-20 rounded-full bg-white/30 p-2"
                  fadeDuration={1000}
                />
                <H3 className="font-semibold text-white">
                  {model?.brand?.name} {model?.name}
                </H3>
                <H4 className="text-white">Available: {item.availableUnits}</H4>
              </Flex>
            </MotiView>
          </Pressable>
        );
      }}
    />
  ) : null;
}
