import moment, { Duration } from 'moment';
import { IValue } from './components/Home';

export const getDoubleDigitNumber = (number: string | number) =>
  String(number).length === 1 ? `0${number}` : number;

export const getDurationFormatted = (duration: Duration) =>
  `${getDoubleDigitNumber(
    parseInt(String(duration.asHours()), 10)
  )}:${getDoubleDigitNumber(duration.minutes())}`;

export function getTodayBalance(today: string, values: IValue): string {
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

  let firstPeriod = moment.duration(lunch.diff(start));
  let secondPeriod = moment.duration(end.diff(back));

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

  return getDurationFormatted(total);
}

export function getAllTimeBalance() {
  // TODO: implement
}
