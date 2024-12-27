import {MotiView} from 'moti';
import {View} from 'react-native';
import {Easing} from 'react-native-reanimated';
import Page from '~/components/page';
import {Flex} from '~/components/ui/flex';
import {LinkButton} from '~/components/ui/link-button';
import {Text} from '~/components/ui/text';
import {H1, P} from '~/components/ui/typography';

export default function SuccessBook() {
  return (
    <Page title="Success Book" className="p-12">
      <View className="flex-1 items-center justify-center">
        <MotiView
          key={Math.random()}
          from={{translateX: 300}}
          animate={{translateX: 0}}
          transition={{
            type: 'timing',
            duration: 1000,
            easing: Easing.elastic(1),
          }}
          className="mb-8">
          <Text className="text-[100px]">🚗</Text>
        </MotiView>
        <H1 className="mb-4 text-center">Test Drive Booked !</H1>
        <P className="mb-4 text-center">
          Your booking has been created successfully, please check your
          schedule. Our team will contact you shortly.
        </P>
        <LinkButton to="HomeTab">Go to Home</LinkButton>
      </View>
    </Page>
  );
}
