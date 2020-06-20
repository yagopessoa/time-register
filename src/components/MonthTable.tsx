import React, { useMemo, useState, useCallback } from 'react';
import moment from 'moment';
import { useTable, Column } from 'react-table';
import { ITableItem, IInput } from '../interfaces';
import { getDaysOfMonth } from '../utils';
import InputTime from './InputTime';
import TableContext from './TableContext';
import { Flex } from './Styles';

const getMomentFromInput = (inputs: IInput[], field: string) => {
  return moment(
    inputs.filter(({ name }) => name.endsWith(field))[0]?.ref?.value,
    'hh:mm'
  );
};

const getDayObject = (inputs: IInput[], day: string) => {
  const dayInputs = inputs.filter(({ name }) => name.startsWith(day));

  return {
    entryTime: getMomentFromInput(dayInputs, 'entryTime'),
    startLunch: getMomentFromInput(dayInputs, 'startLunch'),
    endLunch: getMomentFromInput(dayInputs, 'endLunch'),
    exitTime: getMomentFromInput(dayInputs, 'exitTime'),
    extraEntryTime: getMomentFromInput(dayInputs, 'extraEntryTime'),
    extraExitTime: getMomentFromInput(dayInputs, 'extraExitTime'),
  };
};

export const MonthTable: React.FC = () => {
  const [inputs, setInputs] = useState<IInput[]>([]);
  const [counter, setCounter] = useState<number>(0);

  const registerInput = useCallback(({ name, ref }: IInput) => {
    setInputs((oldInputs) => [...oldInputs, { name, ref }]);
  }, []);

  const getTotalForDay = (day: string) => {
    const {
      entryTime,
      startLunch,
      endLunch,
      exitTime,
      extraEntryTime,
      extraExitTime,
    } = getDayObject(inputs, day);

    const firstPeriod = moment.duration(startLunch.diff(entryTime));
    const secondPeriod = moment.duration(exitTime.diff(endLunch));
    const thirdPeriod = moment.duration(extraExitTime.diff(extraEntryTime));

    const total = firstPeriod.add(secondPeriod).add(thirdPeriod);

    if (!total?.isValid()) {
      return '00:00';
    }

    const totalFormatted = moment(
      `${total.hours()}:${total.minutes()}`,
      'hh:mm'
    ).format('hh:mm');

    return totalFormatted;
  };

  const columns = useMemo<Column<ITableItem>[]>(
    () => [
      {
        Header: 'Dia',
        accessor: 'day',
      },
      {
        Header: 'Entrada',
        accessor: 'entryTime',
      },
      {
        Header: 'Almoço',
        accessor: 'startLunch',
      },
      {
        Header: 'Retorno',
        accessor: 'endLunch',
      },
      {
        Header: 'Saída',
        accessor: 'exitTime',
      },
      {
        Header: 'Entrada',
        accessor: 'extraEntryTime',
      },
      {
        Header: 'Saída',
        accessor: 'extraExitTime',
      },
      {
        Header: 'Total',
        accessor: 'total',
      },
    ],
    []
  );

  const mapDays = () => {
    return getDaysOfMonth(moment().format('MM/YYYY')).map((day) => ({
      day,
      entryTime: <InputTime name={`${day} - entryTime`} />,
      startLunch: <InputTime name={`${day} - startLunch`} />,
      endLunch: <InputTime name={`${day} - endLunch`} />,
      exitTime: <InputTime name={`${day} - exitTime`} />,
      extraEntryTime: <InputTime name={`${day} - extraEntryTime`} />,
      extraExitTime: <InputTime name={`${day} - extraExitTime`} />,
      total: getTotalForDay(day),
    }));
  };

  const data = useMemo<ITableItem[]>(mapDays, [counter]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<ITableItem>({ columns, data });

  const triggerUpdate = () => {
    setCounter((count) => count + 1);
    inputs.forEach(({ name, ref: { value } }) => {
      if (value) {
        console.log(
          `%c${name}  -->  ${value}`,
          'font-size: 18px; color: blue;'
        );
      }
    });
  };

  return (
    <>
      <Flex>
        <TableContext.Provider value={{ registerInput, triggerUpdate }}>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableContext.Provider>
        <h1 style={{ marginLeft: 32 }}>Something here</h1>
      </Flex>
    </>
  );
};
