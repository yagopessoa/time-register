import React from 'react';
import moment from 'moment';
import { MonthTable } from './components/MonthTable';
import { GlobalStyle } from './components/Styles';
require('moment/locale/pt-br.js');

function App() {
  moment.locale('pt-br');

  return (
    <>
      <GlobalStyle />
      <MonthTable />
    </>
  );
}

export default App;
