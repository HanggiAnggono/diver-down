import {FlatList, FlatListProps, Image, View} from 'react-native';
import Page from '~/components/page';
import {Badge} from '~/components/ui/badge';
import {Card, CardContent} from '~/components/ui/card';
import {LoadingIndicator} from '~/components/ui/loading-indicator';
import {Text} from '~/components/ui/text';
import {P} from '~/components/ui/typography';
import {cn, formatDate} from '~/lib/utils';
import {TestDriveStatus, Unit} from '~/services';
import {useGetTestDrivesQuery} from '~/store/api-slice';

export default function MyTestDrive() {
  const {data: testDrives = [], isLoading} = useGetTestDrivesQuery({});

  const renderItem: FlatListProps<
    (typeof testDrives)[number]
  >['renderItem'] = ({item: testDrive}) => {
    const {model, ...unit} = testDrive.unit || ({} as Unit);

    return (
      <Card key={testDrive.id} className="mb-4 flex-row">
        <Image source={{uri: model?.imageUrl}} className="size-32 rounded-xl" />
        <View className="p-4">
          <P className="font-semibold">
            {model?.brand?.name} {model?.name} ({unit.year} {unit.color})
          </P>
          <P>{formatDate(testDrive.date)}</P>
          <Badge
            className={cn('mt-2 bg-muted', {
              'bg-green-500': testDrive.status === TestDriveStatus.COMPLETED,
              'bg-destructive': testDrive.status === TestDriveStatus.CANCELLED,
              'bg-yellow-500': testDrive.status === TestDriveStatus.IN_PROGRESS,
            })}>
            <P>{testDrive.status}</P>
          </Badge>
        </View>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <Page title="My Test Drive" className="items-center justify-center">
        <LoadingIndicator />
      </Page>
    );
  }

  return (
    <Page title="My Test Drive" className="pt-20">
      <FlatList
        data={testDrives}
        renderItem={renderItem}
        keyExtractor={testDrive => testDrive.id}
        contentContainerClassName="px-4"
      />
    </Page>
  );
}
