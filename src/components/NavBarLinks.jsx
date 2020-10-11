import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    links: {
      textDecoration: 'none',
      color: 'grey'
    },
    pressed: {
        color: 'white'
    }
}))

export default function NavBar(props) {

    const classes = useStyles();
    let location = useLocation().pathname
    if(props.link === 'Home') {
        return (
            <Link to={`/`} className={`${classes.links} ${location === '/' && classes.pressed}`}>
                {props.link}
            </Link>
        )
    } else {
        return (
            <Link 
                to={`/${props.link.toLowerCase()}`} 
                className={`${classes.links} ${location.includes(props.link.toLowerCase()) && classes.pressed}`}
            >
                {props.link}
            </Link>
        )
    }
} 