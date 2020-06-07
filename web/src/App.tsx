import React from 'react';

import {GlobalStyle} from './styles/global'

import {ThemeProvider} from 'styled-components'

import Routes from './routes';

import {light} from './styles/theme'
function App() {
  return (
    <ThemeProvider theme={light}>
      <Routes/>
      <GlobalStyle/>
    </ThemeProvider>
  );
}

export default App;
