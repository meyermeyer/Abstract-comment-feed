import React from 'react';
import logo from './logo.svg';
import './App.css';

import Comments from '../Comments/Comments'
require('dotenv').config();

function App() {
  return (
    <div className="App">
      <Comments/>
    </div>
  );
}

export default App;
