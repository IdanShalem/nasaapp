import React, {useState} from 'react';
import MediaCard from './MediaCard'
import SearchBar from './SearchBar'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';

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

    const checkIfSaved = (imgId) => {
        if(props.favouriteImages.find(f => f._id === imgId)) {
            return true
        }
        return false
    }

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
                                        image="https://media.istockphoto.com/vectors/cartoon-scifi-space-background-vector-id1141690154?k=6&m=1141690154&s=170667a&w=0&h=qpbczlazLlAlNzB10GC3oiMPaX-MuH86vyzZSm9xpTM="
                                    />
                        }
                    </CardContent>
                </Grid>   
            </Card>
        </Grid>   
    )
}