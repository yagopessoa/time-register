import React from 'react';
import { render } from 'react-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'regenerator-runtime/runtime.js';

import Home from './components/Home';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

const App = () => {
  moment.locale('pt-br');

  return (
    <>
      <GlobalStyle />
      <Home />
    </>
  );
};

render(<App />, mainElement);
