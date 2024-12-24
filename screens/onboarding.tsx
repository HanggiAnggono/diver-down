import React from 'react';
import {FlatList, Image, View} from 'react-native';
import {H1, P} from '~/components/ui/typography';
import {MotiView} from 'moti';
import {Flex} from '~/components/ui/flex';
import {LinkButton} from '~/components/ui/link-button';

const slides = [
  {
    title: 'Discover Your Dream Car',
    body: 'Browse our extensive inventory, compare models and features, and find the perfect car to match your lifestyle and preferences.',
    image:
      'https://images.unsplash.com/photo-1646728502468-06d9c7b3c2c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHl1bmRhaXxlbnwwfHwwfHx8Mg%3D%3D',
  },
  {
    title: 'Book Your Test Drive Anytime, Anywhere',
    body: 'Schedule your test drive at your convenience with just a few taps. Our app makes it easy to choose a date, time, and location that fits your busy schedule.',
    image:
      'https://images.unsplash.com/photo-1642359085898-d9fde39507c9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNjaGVkdWxlfGVufDB8fDB8fHwy',
  },
  {
    title: 'A Simple and Secure Booking Process',
    body: 'Book your test drive in minutes with our easy-to-use app. Securely manage your bookings and receive reminders and updates directly to your device.',
    image:
      'https://images.unsplash.com/photo-1524841268495-3921a3fb80c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRyaXZpbmd8ZW58MHx8MHx8fDI%3D',
  },
];

export default function Onboarding() {
  const [seen, setSeen] = React.useState<Array<number>>([0]);
  const [index, setIndex] = React.useState(0);

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        className="size-full pt-20"
        onViewableItemsChanged={({viewableItems}) => {
          const viewableIndex = viewableItems[0]?.index;
          if (viewableIndex && !seen.includes(viewableIndex)) {
            setSeen(prev => prev.concat(viewableIndex));
          }
          setIndex(viewableIndex || 0);
        }}
        renderItem={({item, index}) => (
          <Flex className="w-screen flex-col px-4">
            <MotiView
              from={{opacity: 0}}
              animate={{opacity: seen.includes(index) ? 1 : 0}}
              transition={{
                type: 'timing',
                duration: 300,
              }}
              className="h-3/5 items-center justify-center">
              <Image
                source={{
                  uri: item.image,
                }}
                className="size-full rounded-xl"
              />
            </MotiView>
            <MotiView
              from={{opacity: 0}}
              animate={{opacity: seen.includes(index) ? 1 : 0}}
              transition={{type: 'timing', duration: 300, delay: 200}}
              className="flex-col items-center justify-center pt-10">
              <H1 className="mb-4 text-center text-foreground">{item.title}</H1>
              <P className="mb-4 text-center text-foreground">{item.body}</P>
            </MotiView>
            {index === slides.length - 1 && (
              <MotiView
                from={{opacity: 0}}
                animate={{opacity: seen.includes(index) ? 1 : 0}}
                transition={{type: 'timing', duration: 300, delay: 400}}
                className="flex-row items-center justify-center">
                <LinkButton to="Home">Get Started</LinkButton>
              </MotiView>
            )}
          </Flex>
        )}
      />
      <View className="absolute bottom-10 flex-row items-center justify-center gap-4">
        {slides.map((_, i) => (
          <View
            key={i}
            className={`h-2 w-2 rounded-full ${
              i === index ? 'bg-foreground' : 'bg-foreground/50'
            }`}
          />
        ))}
      </View>
    </View>
  );
}
