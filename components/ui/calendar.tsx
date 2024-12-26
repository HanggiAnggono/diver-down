import {
  Calendar as CalendarModule,
  CalendarProps,
} from 'react-native-calendars';
import React from 'react';
import {useUnstableNativeVariable} from 'nativewind';
import hslToHex from 'hsl-to-hex';

const toHex = (hsl: string[] | undefined): string => {
  if (!hsl) {
    return '#000';
  }

  const [h, s, l] = hsl.map(value => {
    return Number(value.toString().replace('%', ''));
  });

  return hslToHex(h, s, l);
};

export function Calendar(props: CalendarProps) {
  const bg = useUnstableNativeVariable('--card');
  const fg = useUnstableNativeVariable('--card-foreground');
  const primary = useUnstableNativeVariable('--primary');
  const primaryFg = useUnstableNativeVariable('--primary-foreground');
  const mutedFg = useUnstableNativeVariable('--muted-foreground');
  const secondary = useUnstableNativeVariable('--secondary');
  const secondaryFg = useUnstableNativeVariable('--secondary-foreground');

  return (
    <CalendarModule
      key={Math.random()}
      style={{borderRadius: 10}}
      disabledByDefault
      disableAllTouchEventsForDisabledDays
      theme={{
        calendarBackground: toHex(bg),
        monthTextColor: toHex(fg),
        todayButtonTextColor: toHex(fg),
        todayTextColor: toHex(secondaryFg),
        todayBackgroundColor: toHex(secondary),
        agendaDayTextColor: toHex(fg),
        textSectionTitleColor: toHex(fg),
        selectedDayBackgroundColor: toHex(primary),
        selectedDayTextColor: toHex(fg),
        dayTextColor: toHex(fg),
        textDisabledColor: `${toHex(mutedFg)}80`,
        dotColor: toHex(fg),
        selectedDotColor: toHex(fg),
        arrowColor: toHex(fg),
      }}
      {...props}
    />
  );
}
