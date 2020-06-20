import React, { useMemo } from 'react';
import moment from 'moment';
import { useTable, Column } from 'react-table';
import { ITableItem } from '../interfaces';
import { InputText } from './Styles';
import { getDaysOfMonth } from '../utils';

export const MonthTable: React.FC = () => {
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
    ],
    []
  );

  const mapDays = () =>
    getDaysOfMonth(moment().format('MM/YYYY')).map((day) => ({
      day,
      entryTime: <InputText />,
      startLunch: <InputText />,
      endLunch: <InputText />,
      exitTime: <InputText />,
      extraEntryTime: <InputText />,
      extraExitTime: <InputText />,
    }));

  const data = useMemo<ITableItem[]>(mapDays, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<ITableItem>({ columns, data });

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
      <br />
      <br />
    </>
  );
};
