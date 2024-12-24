import React from 'react';
import {Linking, Platform, View} from 'react-native';
import {Card, CardContent, CardHeader} from '~/components/ui/card';
import {Flex} from '~/components/ui/flex';
import {Text} from '~/components/ui/text';
import {P} from '~/components/ui/typography';
import {Model, Unit} from '~/services';
import {
  FuelIcon,
  ChevronRightIcon,
  ChevronsRightIcon,
  SettingsIcon,
  MapPinIcon,
} from '~/lib/icons';
import {Button} from '~/components/ui/button';

interface Props {
  model: Model;
  brand: Model['brand'];
  unit: Unit;
}

export function TestDriveOverview(props: Props) {
  const {model, brand, unit} = props;

  const handlePressMap = () => {
    const url = Platform.select({
      ios: `maps://0,0?q=${unit.location}`,
      android: `geo:0,0?q=${unit.location}`,
    });

    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <View className="gap-4">
      <Card>
        <CardHeader>
          <Text>Unit Location</Text>
        </CardHeader>
        <CardContent>
          <P className="mb-2 text-card-foreground">{unit.location}</P>
          <Button variant="link" onPress={handlePressMap}>
            <Text>
              View Map <MapPinIcon className="text-blue-400" size={15} />
            </Text>
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Text>General Information</Text>
        </CardHeader>
        <CardContent>
          {[
            {
              icon: FuelIcon,
              label: 'Engine Type',
              value: model.specs.engineType,
            },
            {
              icon: ChevronRightIcon,
              label: 'Transmission Type',
              value: model.specs.transmissionType,
            },
            {
              icon: ChevronsRightIcon,
              label: 'Top Speed',
              value: model.specs.topSpeed,
            },
            {
              icon: SettingsIcon,
              label: 'Acceleration',
              value: model.specs.acceleration,
            },
          ].map((item, index) => (
            <Flex key={index} className="mb-2 items-center">
              <item.icon className="mr-4 text-card-foreground" />
              <View>
                <P className="text-sm text-muted-foreground">{item.label}</P>
                <P className="text-card-foreground">{item.value}</P>
              </View>
            </Flex>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Text>Model Information</Text>
        </CardHeader>
        <CardContent>
          <Flex className="mb-2 items-center">
            <P className="text-sm text-muted-foreground">Brand</P>
            <P className="text-card-foreground">{brand.name}</P>
          </Flex>
          <Flex className="mb-2 items-center">
            <P className="text-sm text-muted-foreground">Model</P>
            <P className="text-card-foreground">{model.name}</P>
          </Flex>
          <Flex className="mb-2 items-center">
            <P className="text-sm text-muted-foreground">Unit</P>
            <P className="text-card-foreground">{unit.unitNumber}</P>
          </Flex>
        </CardContent>
      </Card>
    </View>
  );
}
