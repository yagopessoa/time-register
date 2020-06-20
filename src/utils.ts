import moment from 'moment';

export const getDaysOfMonth = (
  month: string = '02/2012',
  format: string = 'MM/YYYY'
) => {
  const daysCount = moment(month, format).daysInMonth();
  const firstDay = moment(`01/${month}`, `DD/${format}`);
  const days: string[] = [];

  for (let index = 0; index < daysCount; index++) {
    days.push(moment(firstDay).add(index, 'days').format('DD/MM - ddd'));
  }

  return days;
};
