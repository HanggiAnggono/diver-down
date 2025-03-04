import {faker} from '@faker-js/faker';
import {MotiView} from 'moti';
import React, {useEffect} from 'react';
import {Image, ImageBackground, ScrollView, View} from 'react-native';
import Page from '~/components/page';
import {TestDriveOverview} from '~/components/test-drive/overview';
import {UnitSelect} from '~/components/test-drive/unit-select';
import {Button} from '~/components/ui/button';
import {Card} from '~/components/ui/card';
import {Flex} from '~/components/ui/flex';
import {LinkButton} from '~/components/ui/link-button';
import {LoadingIndicator} from '~/components/ui/loading-indicator';
import {TabsComponent} from '~/components/ui/tabs-component';
import {Text} from '~/components/ui/text';
import {TextAnimated} from '~/components/ui/text-animated';
import {H1, P} from '~/components/ui/typography';
import {camelCaseToHumanCase, cn} from '~/lib/utils';
import {ScreenProps} from '~/navigation';
import {Unit} from '~/services';
import {carImages} from '~/services/mock';
import {useGetAvailableUnitsByModelIdQuery} from '~/store/api-slice';
import {useAppDispatch, useAppSelector} from '~/store/store';
import {resetTestDrive} from '~/store/test-drive-slice';

export default function TestDrive(props: ScreenProps<'TestDrive'>) {
  const dispatch = useAppDispatch();
  const {modelId} = props.route.params;
  const {data: units = [], isLoading} =
    useGetAvailableUnitsByModelIdQuery(modelId);
  const unit = units?.[0];
  const {model} = unit || {};
  const {brand} = model || {};

  useEffect(() => {
    dispatch(resetTestDrive());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Page
        title={model?.name}
        className="flex-1 content-center items-center justify-center">
        <LoadingIndicator />
      </Page>
    );
  }

  return (
    <Page
      title={`${model?.brand.name} ${model?.name}`}
      className="flex-1 bg-background">
      <ScrollView contentContainerClassName="pb-[15rem]">
        <ImageBackground
          source={{uri: model?.imageUrl}}
          className="mb-4 h-[30rem] w-full justify-end overflow-hidden rounded-ee-[100px] bg-card pb-8 pl-4"
          resizeMode="contain">
          <Image
            source={{uri: brand?.imageUrl}}
            className="size-20 rounded-2xl"
            resizeMode="contain"
          />
        </ImageBackground>
        <View className="px-4">
          <H1 className="text-3xl">
            {brand?.name} {model?.name}
          </H1>
          <P className="mb-4">
            {model?.specs.engineCapacity.toFixed(1)}{' '}
            {model?.specs.transmissionType} {model?.specs.engineType}{' '}
          </P>
          {/* <P className="mb-4">{model?.description}</P> */}
          <TextAnimated wrapperClassName="mb-4">
            {model?.description}
          </TextAnimated>

          <View className="mb-4">
            <UnitSelect units={units || []} />
          </View>

          <TabsComponent
            tabs={[
              {
                title: 'Overview',
                value: 'overview',
                content: (
                  <TestDriveOverview unit={unit} model={model} brand={brand} />
                ),
              },
              {
                title: 'Specifications',
                value: 'specs',
                content: (
                  <View className="flex flex-row flex-wrap">
                    {Object.entries(model?.specs || {}).map(
                      ([key, value], index) => {
                        return (
                          <MotiView
                            key={key}
                            className="mb-4 flex w-1/2 px-2"
                            from={{opacity: 0, translateY: 20}}
                            animate={{opacity: 1, translateY: 0}}
                            transition={{
                              type: 'timing',
                              duration: 200,
                              delay: index * 30,
                            }}>
                            <Card className="h-max flex-grow p-4">
                              <P className="text-muted-foreground">
                                {camelCaseToHumanCase(key)}
                              </P>
                              <P className="text-card-foreground">{value}</P>
                            </Card>
                          </MotiView>
                        );
                      },
                    )}
                  </View>
                ),
              },
              {
                title: 'Gallery',
                value: 'gallery',
                content: (
                  <View className="flex flex-row flex-wrap">
                    {faker.helpers
                      .arrayElements(carImages, {min: 3, max: 99})
                      .map((image, index) => {
                        return (
                          <MotiView
                            from={{opacity: 0, translateY: 20}}
                            animate={{opacity: 1, translateY: 0}}
                            transition={{
                              type: 'timing',
                              duration: 200,
                              delay: index * 30,
                            }}
                            key={image}
                            className="mb-4 flex w-1/2 px-2">
                            <Image
                              source={{uri: image}}
                              className="h-40 w-full rounded-2xl bg-secondary"
                            />
                          </MotiView>
                        );
                      })}
                  </View>
                ),
              },
            ]}
          />
        </View>
      </ScrollView>

      <TestDriveButton units={units} />
    </Page>
  );
}

const TestDriveButton = ({units = []}: {units: Unit[]}) => {
  const selectedUnitId = useAppSelector(state => state.testDrive.unitId);
  const selectedUnit = units.find(unit => unit.id === selectedUnitId);
  const availability = selectedUnit?.availability;

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-background p-4 px-8 shadow-md">
      {selectedUnit && (
        <P className="mb-4">
          {selectedUnit?.year} - {selectedUnit?.color}
        </P>
      )}

      <LinkButton
        _button={{
          disabled: !availability,
          className: availability ? '' : 'bg-muted',
        }}
        to="TestDriveSchedule"
        params={{unitId: selectedUnitId}}>
        <Text
          className={cn(
            'w-full text-center uppercase text-primary-foreground',
            availability ? '' : 'text-muted-foreground',
          )}>
          {availability ? 'Book Test Drive' : 'Unavailable'}
        </Text>
      </LinkButton>
    </View>
  );
};
