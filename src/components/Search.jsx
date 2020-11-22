import React, {useState} from 'react';
import MediaCard from './MediaCard'
import SearchBar from './SearchBar'
import { Grid, Card, CardContent, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import searchPic from '../istockphoto-1141690154-170667a.jpg'

const axios = require('axios')
const useStyles = makeStyles({
    root: {
        marginTop: '20px',
        marginBottom: '20px'
    },
    card:{
        backgroundColor: '#150f2b',
        padding: '15px',
        paddingTop: '5px',
    }
});

export default function Search(props) {

    const [results, setResults] = useState([])
    const classes = useStyles();

    const handleSearch = (value) => {
        setResults([])
        const allResults = []
        axios.get(`https://images-api.nasa.gov/search?q=${value}`)
            .then(res => {
                res.data.collection.items.forEach(i => {
                    if(i. links) {
                        const imgUrl = i.links.find(l => l.render === 'image').href
                        if(imgUrl) {
                            const image = {
                                _id: i.data[0].nasa_id, 
                                title: i.data[0].title, 
                                imgUrl, 
                                description: i.data[0].description,
                                isSaved: checkIfSaved(i.data[0].nasa_id)
                            }
                            allResults.push(image)
                        }
                    }
                })
                setResults(allResults)
            })
    }

    const checkIfSaved = imgId => props.favouriteImages.find(f => f._id === imgId)

    return (
        <Grid item className={classes.root} container xs={11} alignItems='center'>
            <Card className={classes.card}>
                <SearchBar handleSearch={handleSearch} />
                <Grid item  xs={12} container justify="center" align="center" container>
                    <CardContent>
                        {results.length > 0 
                                ?   results.map( image => 
                                        <MediaCard 
                                            key={image.id} 
                                            image={image} 
                                            favouriteImages={props.favouriteImages}
                                            handleSave={props.handleSave}
                                            handleDelete={props.handleDelete}
                                        />
                                    )
                                :   <CardMedia
                                        component="img"
                                        width='100%'
                                        image={searchPic}
                                    />
                        }
                    </CardContent>
                </Grid>   
            </Card>
        </Grid>   
    )
}