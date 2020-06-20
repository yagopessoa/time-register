import { createContext } from 'react';
import { ITableContext } from '../interfaces';

const TableContext = createContext<ITableContext>({
  registerInput: () => null,
  triggerUpdate: () => null,
});

export default TableContext;
