import React, {useState, useEffect, Fragment} from 'react';
import MediaCard from './MediaCard'
import { Grid, Card, CardContent, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root1: {
        marginBottom: '20px'
    },
    root2: {
        marginTop: '20px',
        marginBottom: '20px'
    },
    card:{
        backgroundColor: '#150f2b',
        padding: '15px',
        paddingTop: '5px',
    },
    title: {
        color: 'white',
        paddingBottom: '0px'
    }
});

const axios = require('axios')

export default function Favourites(props) {
    
    const [imageDb, setImageDb] = useState({}) 
    const classes = useStyles();

    useEffect(() => {
        if(props.match) {
            const {imageId} = props.match.params
            axios.get(`http://localhost:3001/images/${imageId}`)
                .then(image => {
                    setImageDb(image.data)
                })
        } 
    }, [props.match])

    useEffect(() => {
        props.getAllImages()
    }, [])

    return (
        <Fragment>
                {imageDb.title 
                    ?   <Grid item className={classes.root1} xs={12} justify='center' align='center'>
                            <MediaCard 
                                key={imageDb._id} 
                                image={imageDb} 
                                handleSave={props.handleSave}
                                handleDelete={props.handleDelete}
                            />
                        </Grid>
                    :   <Grid item className={classes.root2} xs={11} container justify='center' align='center'>
                            <Card className={classes.card}> 
                                <Grid item  xs={12} container justify="center" align="center" container>
                                    <CardHeader 
                                        title='Favourites:'
                                        className={classes.title}
                                    />
                                    <CardContent style={{paddingTop: '0px'}}>
                                        {props.favouriteImages
                                            .map(i => {
                                            return (
                                                <MediaCard 
                                                    key={i._id} 
                                                    image={i} 
                                                    handleSave={props.handleSave}
                                                    handleDelete={props.handleDelete}
                                                />
                                            )
                                        })} 
                                    </CardContent>
                                </Grid>
                            </Card>
                        </Grid>
                }
        </Fragment>
    )
}