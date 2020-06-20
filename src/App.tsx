import React from 'react';
import moment from 'moment';
import { MonthTable } from './components/MonthTable';
require('moment/locale/pt-br.js');

function App() {
  moment.locale('pt-br');

  return <MonthTable />;
}

export default App;
