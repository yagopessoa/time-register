import moment, { Duration } from 'moment';
import { IValue } from './components/Home';

export const getDoubleDigitNumber = (
  number: string | number,
  isMinute = false
) => {
  if (String(number).includes('-')) {
    if (isMinute) {
      return String(number).length === 2
        ? `0${String(number).replace('-', '')}`
        : `${String(number).replace('-', '')}`;
    }
    return String(number).length === 2
      ? `-0${String(number).replace('-', '')}`
      : number;
  }
  return String(number).length === 1 ? `0${number}` : number;
};

export const getDurationFormatted = (duration: Duration) =>
  `${getDoubleDigitNumber(
    parseInt(String(duration.asHours()), 10)
  )}:${getDoubleDigitNumber(duration.minutes(), true)}`;

export function getTodayBalance(
  today: string,
  values: IValue,
  formatted: boolean = true
): string | moment.Duration {
  const start = moment(
    `${today} - ${values[`${today}-start`] || ''}`,
    'DD/MM/YYYY - hh:mm'
  );
  const lunch = moment(
    `${today} - ${values[`${today}-lunch`] || ''}`,
    'DD/MM/YYYY - hh:mm'
  );
  const back = moment(
    `${today} - ${values[`${today}-back`] || ''}`,
    'DD/MM/YYYY - hh:mm'
  );
  const end = moment(
    `${today} - ${values[`${today}-end`] || ''}`,
    'DD/MM/YYYY - hh:mm'
  );

  let firstPeriod;
  if (start.isValid() && lunch.isValid()) {
    firstPeriod = moment.duration(lunch.diff(start));
  } else {
    firstPeriod = moment.duration(0);
  }

  let secondPeriod;
  if (start.isValid() && lunch.isValid()) {
    secondPeriod = moment.duration(end.diff(back));
  } else {
    secondPeriod = moment.duration(0);
  }

  if (firstPeriod.asMilliseconds() < 0) {
    firstPeriod = moment.duration(0);
  }
  if (secondPeriod.asMilliseconds() < 0) {
    secondPeriod = moment.duration(0);
  }

  const total = firstPeriod.add(secondPeriod);

  if (!total?.isValid()) {
    return '00:00';
  }

  return formatted ? getDurationFormatted(total) : total;
}

interface IDaysValues {
  [x: string]: IValue;
}

export function getAllTimeBalance(values: IValue): string {
  const requiredPerDay = moment.duration(8, 'hours');

  const days: IDaysValues = {};
  const durations: Array<moment.Duration> = [];

  Object.keys(values).forEach((key: string) => {
    const day = key.substr(0, 10);
    days[day] = {};
  });

  Object.keys(days).forEach((day: string) => {
    const start = `${day}-start`;
    const lunch = `${day}-lunch`;
    const back = `${day}-back`;
    const end = `${day}-end`;

    days[day] = {
      [start]: values[start] || '',
      [lunch]: values[lunch] || '',
      [back]: values[back] || '',
      [end]: values[end] || '',
    };

    const dayDuration = getTodayBalance(
      day,
      days[day],
      false
    ) as moment.Duration;

    if (dayDuration.asMilliseconds() > 0) {
      durations.push(dayDuration.subtract(requiredPerDay));
    }
  });

  const total = durations.reduce(
    (total, current) => total.add(current),
    moment.duration(0)
  );

  console.log(total.asHours(), total.minutes());
  return getDurationFormatted(total);
}
