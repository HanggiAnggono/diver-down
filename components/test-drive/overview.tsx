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
  InfoIcon,
} from '~/lib/icons';
import {Button} from '~/components/ui/button';
import {useAppSelector} from '~/store/store';

interface Props {
  /** if provided this props will override the unit from global state  */
  unit?: Unit;
}

export function TestDriveOverview(props: Props) {
  const unit = useAppSelector(state => {
    return props.unit || state.testDrive.unit;
  });
  const {model} = unit || {};
  const {brand} = model || {};

  const handlePressMap = () => {
    const url = Platform.select({
      ios: `maps://0,0?q=${unit?.location}`,
      android: `geo:0,0?q=${unit?.location}`,
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
          <P className="mb-2 text-card-foreground">{unit?.location}</P>
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
              value: model?.specs.engineType,
            },
            {
              icon: ChevronRightIcon,
              label: 'Transmission Type',
              value: model?.specs.transmissionType,
            },
            {
              icon: ChevronsRightIcon,
              label: 'Top Speed',
              value: model?.specs.topSpeed,
            },
            {
              icon: SettingsIcon,
              label: 'Acceleration',
              value: model?.specs.acceleration,
            },
          ].map((item, index) => (
            <IconLabelValue
              key={index}
              Icon={item.icon}
              label={item.label}
              value={item.value || ''}
            />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Text>Model Information</Text>
        </CardHeader>
        <CardContent>
          <IconLabelValue
            Icon={InfoIcon}
            label="Brand"
            value={brand?.name || ''}
          />
          <IconLabelValue
            Icon={InfoIcon}
            label="Model"
            value={model?.name || ''}
          />
          <IconLabelValue
            Icon={InfoIcon}
            label="Unit"
            value={unit?.unitNumber || ''}
          />
        </CardContent>
      </Card>
    </View>
  );
}

const IconLabelValue = (props: {
  Icon: any;
  label: string;
  value: string | number;
}) => {
  const Icon = props.Icon;
  return (
    <Flex className="mb-2 items-center">
      <Icon className="mr-4 text-card-foreground" />
      <View>
        <P className="text-sm text-muted-foreground">{props.label}</P>
        <P className="text-card-foreground">{props.value}</P>
      </View>
    </Flex>
  );
};
