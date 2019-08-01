import React from 'react';
import './App.css';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'

import ResponsiveDrawer from '../ResponsiveDrawer/ResponsiveDrawer'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#945ecf', dark: '#674190', light: '#a97ed8' },
    secondary: { main: '#2196f3', dark: '#1769aa', light: '#4dabf5' },
    error: { main: '#c2185b' }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ResponsiveDrawer />
      </div>
    </ThemeProvider>
    
  );
}

export default App;
