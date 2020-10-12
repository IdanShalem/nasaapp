import React, {useState, useEffect} from 'react';
import MediaCard from './MediaCard'
import { Grid, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const axios = require('axios')
const apiKey = require('../API_Key').ApiKey

const useStyles = makeStyles({
    root: {
      marginBottom: '20px'
    },
    progress: {
        marginTop: '50px'
    }
  });

export default function Home() {

    const [apod, setAstronomy] = useState({ title: '', img: '', description: '' })
    const [isLoading, setIsLoading] = useState(true)
    const classes = useStyles();

    useEffect(() => {
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
            .then(a => {
                setAstronomy({ 
                    title: a.data.title, 
                    imgUrl: a.data.url, 
                    description: a.data.explanation 
                })
                setIsLoading(false)
            })
        }, [])

    return (
        <Grid className={classes.root} item xs={12} container justify='center' align='center'>
            {isLoading 
                ? <CircularProgress className={classes.progress}/>
                : <MediaCard image={apod}/>}
        </Grid>
    )
}