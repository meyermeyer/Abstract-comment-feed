import React from 'react';
import logo from './logo.svg';
import './App.css';

import Projects from '../Projects/Projects'
require('dotenv').config();

function App() {
  return (
    <div className="App">
      <Projects/>
    </div>
  );
}

export default App;
