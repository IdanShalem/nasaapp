import React from 'react'
import NavBarLinks from './NavBarLinks'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      top: 0,
      zIndex: 9999,
      marginBottom: '60px'
    },
    bar:{
        backgroundColor: '#290d5e'
    },
    button: {
        marginRight: theme.spacing(2),
    }
}))

export default function NavBar() {

    const navLinks = ['Home', 'Search' ,'Favourites']
    const classes = useStyles();
    
    return (
        <Grid item className={classes.root} xs={12} container>
            <AppBar position="fixed" className={classes.bar}>
                <Toolbar>
                    {navLinks.map(n => 
                        <Button className={classes.button} color="inherit">
                            <NavBarLinks link={n} />
                        </Button>)}
                </Toolbar>
            </AppBar>
        </Grid>
    )
}