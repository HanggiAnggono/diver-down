import {MotiView} from 'moti';
import React from 'react';
import {Text} from 'react-native';
import {Tabs, TabsList, TabsTrigger, TabsContent} from '~/components/ui/tabs';

interface TabsProps {
  tabs: Array<{
    title: string;
    content: React.ReactNode;
    value: string;
  }>;
}

export const TabsComponent = (props: TabsProps) => {
  const [value, setValue] = React.useState(props.tabs[0].value);

  return (
    <Tabs value={value} onValueChange={setValue} className="gap-4">
      <TabsList className="w-full flex-row items-center justify-start gap-2">
        {props.tabs.map(tab => (
          <TabsTrigger key={tab.value} value={tab.value} className="flex-1">
            <Text className="text-foreground">{tab.title}</Text>
          </TabsTrigger>
        ))}
      </TabsList>
      {props.tabs.map(tab => (
        <TabsContent key={tab.value} value={tab.value}>
          <MotiView
            from={{opacity: 0, translateX: 20}}
            animate={{opacity: 1, translateX: 0}}
            transition={{type: 'timing', duration: 200}}>
            {tab.content}
          </MotiView>
        </TabsContent>
      ))}
    </Tabs>
  );
};
