import React, {useEffect} from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import {MotiView} from 'moti';
import {cn} from '~/lib/utils';
import {Unit} from '~/services';
import {H3, P} from '~/components/ui/typography';
import {useAppDispatch, useAppSelector} from '~/store/store';
import {setUnit} from '~/store/test-drive-slice';

interface Props {
  units: Array<Unit>;
}

export function UnitSelect({units = []}: Props) {
  const scrollRef = React.useRef(null);
  const dispatch = useAppDispatch();
  const {unitId} = useAppSelector(state => state.testDrive);
  const hasSelectedUnit =
    units.length > 0 && !units.find(unit => unit.id === unitId);

  useEffect(() => {
    if (hasSelectedUnit) {
      dispatch(setUnit(units[0]));
    }
  }, [hasSelectedUnit, units, dispatch]);

  const renderItem = ({item}: {item: Unit; index: number}) => (
    <MotiView
      from={{scale: 1}}
      animate={{scale: unitId === item.id ? 1.2 : 1}}
      transition={{type: 'timing', duration: 300}}
      className="mx-4 flex flex-col items-center">
      <Pressable onPress={() => dispatch(setUnit(item))}>
        <Image
          source={{uri: item.imageUrl}}
          className={cn(
            'h-[100px] w-[100px] rounded-xl bg-card',
            unitId === item.id && 'border-2 border-primary dark:border-4',
            item.availability ? 'opacity-100' : 'opacity-50',
          )}
        />
        {!item.availability && (
          <Text className="absolute left-1/2 mt-2 -translate-x-1/2 text-sm font-semibold text-foreground">
            Unavailable
          </Text>
        )}
        <Text className="mt-2 text-sm font-semibold text-foreground">
          {item.year} - {item.color}{' '}
        </Text>
      </Pressable>
    </MotiView>
  );

  return (
    <View className="flex justify-between">
      <View>
        <H3>Choose a unit</H3>
        <P>{units.length} units</P>
      </View>
      <FlatList
        ref={scrollRef}
        data={units}
        horizontal
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        overScrollMode="always"
        className="py-[1rem]"
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={100}
        decelerationRate="fast"
      />
    </View>
  );
}
