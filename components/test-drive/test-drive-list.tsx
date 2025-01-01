import {useNavigation} from '@react-navigation/native';
import {MotiView} from 'moti';
import React, {useCallback, useState} from 'react';
import {FlatList, Image, ImageBackground, Pressable, View} from 'react-native';
import {Card} from '~/components/ui/card';
import {Flex} from '~/components/ui/flex';
import {H3, H4, P} from '~/components/ui/typography';
import {GalleryHorizontalIcon, LayoutGridIcon} from '~/lib/icons';
import {cn, groupBy} from '~/lib/utils';
import {UseNavigation} from '~/navigation';
import {getTestDriveUnits} from '~/services/test-drive-services';

type Props = {
  models: Awaited<ReturnType<typeof getTestDriveUnits>>;
};

export function TestDriveList(props: Props) {
  const navigation = useNavigation<UseNavigation>();
  const [layout, setLayout] = useState<'list' | 'grid'>('grid');

  const handlePress = (model: Props['models'][0]) => () => {
    navigation.navigate('TestDrive', {modelId: model.modelId});
  };

  function renderGrid() {
    return (
      <FlatList
        key="grid"
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
                  <H4 className="text-white">
                    {item.availableUnits > 0
                      ? `${item.availableUnits} Available`
                      : 'Unavailable'}
                  </H4>
                </Flex>
              </MotiView>
            </Pressable>
          );
        }}
      />
    );
  }

  const [visibleItem, setVisibleItem] = useState(0);
  const onViewableItemsChanged = useCallback(
    ({viewableItems}) => {
      if (viewableItems.length > 0) {
        setVisibleItem(viewableItems[0].index);
      }
    },
    [setVisibleItem],
  );

  function renderList() {
    return (
      <FlatList
        key="list"
        data={props.models}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        snapToAlignment="start"
        snapToOffsets={props.models.map((m, i) => 320 * i)}
        contentContainerClassName="gap-4 p-4"
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={({item, index}) => {
          const {model, units, availableUnits} = item;
          return (
            <MotiView
              from={{scale: 0.9}}
              animate={{
                scale: index === visibleItem ? 1 : 0.9,
              }}
              transition={{type: 'timing', duration: 300}}
              className="h-auto w-[300px]">
              <View className="flex-1/4 mb-2 items-center justify-between gap-2">
                <Image
                  source={{uri: model.brand.imageUrl}}
                  resizeMode="cover"
                  className="size-20 rounded-full bg-white"
                />
                <H3 className="text-center font-semibold">
                  {model?.brand?.name} {model?.name}
                </H3>
                <P>{availableUnits} Available Units</P>
              </View>
              <Pressable
                className="flex-3/4 flex-grow overflow-hidden rounded-xl"
                onPress={() =>
                  navigation.navigate('TestDrive', {modelId: model.id})
                }>
                <Card className="flex-1">
                  <ImageBackground
                    source={{uri: model.imageUrl}}
                    resizeMode="cover"
                    className="flex-1 overflow-hidden rounded-xl">
                    <Flex className="flex-row items-center justify-between p-4">
                      <Image
                        source={{uri: model.brand.imageUrl}}
                        resizeMode="cover"
                        className="h-10 w-10 rounded-full bg-white"
                      />
                      <H4 className="text-white">Model Name</H4>
                    </Flex>
                  </ImageBackground>
                </Card>
              </Pressable>
            </MotiView>
          );
        }}
      />
    );
  }

  if (props.models.length === 0) {
    return null;
  }

  return (
    <View className="flex-1">
      <Flex className="mb-4 ml-auto mr-4 gap-4 rounded-full bg-card p-2 px-4">
        <Pressable onPress={() => setLayout('grid')}>
          <LayoutGridIcon
            className={cn('text-card-foreground/30', {
              'text-card-foreground': layout === 'grid',
            })}
          />
        </Pressable>
        <Pressable onPress={() => setLayout('list')}>
          <GalleryHorizontalIcon
            className={cn('text-card-foreground/30', {
              'text-card-foreground': layout === 'list',
            })}
          />
        </Pressable>
      </Flex>
      {layout === 'grid' ? renderGrid() : renderList()}
    </View>
  );
}
