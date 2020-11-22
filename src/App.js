import React, { useState } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar'
import Container from './components/Container'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Snackbar, SnackbarContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  snackbar: {
    backgroundColor: '#6e57ba',
    justifyContent: 'center'
  }
}))

function App() {
  const classes = useStyles();

  const [snackbar, setOpen] = useState({open: false, message:''})

  const handleClick = (message) => {
    setTimeout(function(){
      setOpen({open: false, message})
    }, 2000)
    setOpen({open: true, message})
  }

  return (
    <Router>
      <Grid
        className={classes.root}
        container
        direction="row"
        justify="center"
      >
        <NavBar />
        <Container handleClick={handleClick} />
        <Snackbar
          anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
          open={snackbar.open}
          key={'bottom' + 'center'}
        >
          <SnackbarContent 
            className={classes.snackbar}
            message={`Item ${snackbar.message}`}
          />
        </Snackbar>
      </Grid>
    </Router>
  );
}

export default App;
