import React from 'react';
import logo from './logo.svg';
import './App.css';

import CommentFeed from '../CommentFeed/CommentFeed'
import ResponsiveDrawer from '../ResponsiveDrawer/ResponsiveDrawer'

import Projects from '../Projects/Projects'
require('dotenv').config();

function App() {
  return (
    <div className="App">
      <ResponsiveDrawer/>
      <CommentFeed />
      {/* <Projects/> */}
    </div>
  );
}

export default App;
