import React from 'react'
import NavBarLinks from './NavBarLinks'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Grid, Button, MenuItem } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import nasaLogo from '../kisspng-logo-nasa-insignia-vector-graphics-portable-networ-vasper-5c0bc49343c935.1278996415442750912777.png'

const useStyles = makeStyles((theme) => ({
    root: {
      top: 0,
      zIndex: 9999,
      marginBottom: '60px'
    },
    bar:{
        backgroundColor: '#290d5e',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    button: {
        marginRight: theme.spacing(2),
    },
    img: {
        justifySelf: 'end'
    }
}))

export default function NavBar() {

    const userLinks = ['Home', 'Search' ,'Favourites']
    const classes = useStyles();

    const history = useHistory();
    
    return (
        <Grid item className={classes.root} xs={12} container>
            <AppBar position="fixed" className={classes.bar}>
                <Toolbar className={classes.toolbar}>
                    <MenuItem>
                    {userLinks.map(n => 
                        <Button className={classes.button} color="inherit">
                            <NavBarLinks link={n} />
                        </Button>)
                    }
                    </MenuItem>
                    <MenuItem>
                        <img className={classes.img} height='60px' src={nasaLogo}/>
                    </MenuItem>
                </Toolbar>   
            </AppBar>   
        </Grid>
    )
}