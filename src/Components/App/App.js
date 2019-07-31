import React from 'react';
import logo from './logo.svg';
import './App.css';

import {withStyles} from '@material-ui/core'

import CommentFeed from '../CommentFeed/CommentFeed'
import ResponsiveDrawer from '../ResponsiveDrawer/ResponsiveDrawer'
 
require('dotenv').config();

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//   },
//   drawer: {
//     [theme.breakpoints.up('sm')]: {
//       width: drawerWidth,
//       flexShrink: 0,
//     },
//   },
//   appBar: {
//     marginLeft: drawerWidth,
//     [theme.breakpoints.up('sm')]: {
//       width: `calc(100% - ${drawerWidth}px)`,
//     },
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//     [theme.breakpoints.up('sm')]: {
//       display: 'none',
//     },
//   },
//   toolbar: theme.mixins.toolbar,
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
// }));
function App() {
  return (
    <div className="App">
      <ResponsiveDrawer/>
      {/* <CommentFeed /> */}
      {/* <Projects/> */}
    </div>
  );
}

export default App;
