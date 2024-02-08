import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, GlobalStyles, createTheme, ThemeProvider } from '@mui/material'; // normalize.css от MUI
import App from './components/App';
import './index.css';

const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: 'black',
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <GlobalStyles styles={{ body: { backgroundColor: 'black' } }} />
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
);
