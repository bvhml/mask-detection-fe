import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PirateTheme from 'PirateTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Dashboard } from 'components';

let theme = PirateTheme;
export default function App () {
  
  const mobile = useMediaQuery('(min-width:600px)');
  let useStyles = makeStyles(theme => ({
    root: {
      height:  'auto',
      minHeight: '100vh',
      backgroundColor: '#60646D'
    },
  }));
  
  const classes = useStyles();
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Route path="/" exact>
            <Dashboard classes={classes} mobile={mobile}/>
          </Route>
        </Router>
      </ThemeProvider>
    );
}