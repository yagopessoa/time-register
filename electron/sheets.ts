import { shell, remote } from 'electron';
import * as path from 'path';
import xl from 'exceljs';
import moment, { Duration } from 'moment';

import { getReportDir } from './filenames';

export interface IValues {
  [x: string]: string;
}

interface IDaysValues {
  [x: string]: IValues;
}

export const getDoubleDigitNumber = (number: string | number) =>
  String(number).length === 1 ? `0${number}` : number;

export const getDurationFormatted = (duration: Duration) =>
  `${getDoubleDigitNumber(
    parseInt(String(duration.asHours()), 10)
  )}:${getDoubleDigitNumber(duration.minutes())}`;

export function getTodayBalance(
  today: string,
  values: IValues,
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

function getDaysOfCurrentMonth(
  month: string,
  format: string = 'MM/YYYY'
): string[] {
  const daysCount = moment().daysInMonth();
  const firstDay = moment(`01/${month}`, `DD/${format}`);
  const days: string[] = [];

  for (let index = 0; index < daysCount; index++) {
    const day = moment(firstDay).add(index, 'days').format(`DD/${format}`);
    days.push(day);
  }

  return days;
}

export async function exportExcel(values: IValues, month?: string) {
  const days: IDaysValues = {};

  const workbook = new xl.Workbook();
  const worksheet = workbook.addWorksheet('Relatório de horas');

  worksheet.columns = [
    {
      key: 'day',
      width: 15,
      alignment: { vertical: 'middle', horizontal: 'right' },
    },
    {
      key: 'weekday',
      width: 20,
      alignment: { vertical: 'middle', horizontal: 'left' },
    },
    {
      key: 'start',
      width: 10,
      alignment: { vertical: 'middle', horizontal: 'right' },
    },
    {
      key: 'lunch',
      width: 10,
      alignment: { vertical: 'middle', horizontal: 'right' },
    },
    {
      key: 'back',
      width: 10,
      alignment: { vertical: 'middle', horizontal: 'right' },
    },
    {
      key: 'end',
      width: 10,
      alignment: { vertical: 'middle', horizontal: 'right' },
    },
    {
      key: 'totalDay',
      width: 10,
      alignment: { vertical: 'middle', horizontal: 'right' },
    },
  ];

  worksheet.getRow(1).values = ['Nome:'];
  worksheet.getRow(2).values = [
    'Data',
    'Dia da semana',
    'Entrada',
    'Almoço',
    'Retorno',
    'Saída',
    'Hora dia',
  ];

  ['A1', 'A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2'].forEach((cell) => {
    worksheet.getCell(cell).font = {
      bold: true,
    };
  });

  Object.keys(values).forEach((key: string) => {
    const day = key.substr(0, 10);
    days[day] = {};
  });

  getDaysOfCurrentMonth(month || moment().format('MM/YYYY')).forEach(
    (day: string, index: number) => {
      const start = `${day}-start`;
      const lunch = `${day}-lunch`;
      const back = `${day}-back`;
      const end = `${day}-end`;

      const row = worksheet.getRow(index + 3);

      const totalDay = getTodayBalance(day, {
        [start]: values[start] || '',
        [lunch]: values[lunch] || '',
        [back]: values[back] || '',
        [end]: values[end] || '',
      }) as string;

      row.getCell('day').value = day;
      row.getCell('weekday').value = moment(day, 'DD/MM/YYYY').format('dddd');
      row.getCell('start').value = values[start] || '';
      row.getCell('lunch').value = values[lunch] || '';
      row.getCell('back').value = values[back] || '';
      row.getCell('end').value = values[end] || '';
      row.getCell('totalDay').value = totalDay;
    }
  );

  const identification = (
    moment(month, 'MM/YYYY') || moment().format('MM/YYYY')
  ).format('MMMM_YYYY');

  const fileName = path.join(
    getReportDir(),
    `Relatorio_${identification}.xlsx`
  );

  await workbook.xlsx.writeFile(fileName);

  shell?.showItemInFolder(fileName);
  remote?.shell?.showItemInFolder(fileName);

  console.log(`${fileName} saved!\n`);
}
