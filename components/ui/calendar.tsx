import {Calendar as CalendarModule} from 'react-native-calendars';
import React from 'react';
import {useColorScheme} from '~/lib/useColorScheme';
import {useUnstableNativeVariable} from 'nativewind';
import hslToHex from 'hsl-to-hex';

const toHex = (hsl: string[]) => {
  const [h, s, l] = hsl.map(value => {
    return Number(value.toString().replace('%', ''));
  });

  return hslToHex(h, s, l);
};

export function Calendar() {
  const bg = useUnstableNativeVariable('--card');
  const fg = useUnstableNativeVariable('--card-foreground');
  const primary = useUnstableNativeVariable('--primary');
  const primaryFg = useUnstableNativeVariable('--primary-foreground');
  const secondary = useUnstableNativeVariable('--secondary');

  return (
    <CalendarModule
      key={Math.random()}
      style={{borderRadius: 10}}
      theme={{
        calendarBackground: toHex(bg),
        monthTextColor: toHex(fg),
        todayButtonTextColor: toHex(primary),
        agendaDayTextColor: toHex(fg),
        textSectionTitleColor: toHex(fg),
        selectedDayBackgroundColor: toHex(primary),
        selectedDayTextColor: toHex(primaryFg),
        todayTextColor: toHex(primary),
        dayTextColor: toHex(fg),
        textDisabledColor: toHex(fg),
        dotColor: toHex(fg),
        selectedDotColor: toHex(fg),
        arrowColor: toHex(fg),
      }}
    />
  );
}
