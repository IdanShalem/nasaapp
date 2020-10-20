import React, {useState , useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar'
import Container from './components/Container'
import UserContext from './components/context/UserContext'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Snackbar, SnackbarContent } from '@material-ui/core';
import axios from 'axios'

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

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  })

  useEffect(() => {
    const checkLoggedIn  = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "http://localhost:3001/user/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await axios.get('http://localhost:3001/user/',
          { headers: { "x-auth-token": token } }
        );
        setUserData({
          token,
          user: userRes.data
        })
      }
    };
    checkLoggedIn()
  }, [])

  const handleClick = (message) => {
    setTimeout(function(){
      setOpen({open: false, message})
    }, 2000)
    setOpen({open: true, message})
  }

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
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
      </UserContext.Provider>
    </Router>
  );
}

export default App;
