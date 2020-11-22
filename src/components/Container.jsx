import React, {useState, useEffect, Fragment} from 'react';
import {Route} from 'react-router-dom'
import Home from './Home'
import Search from './Search'
import Favourites from './Favourites'
import axios from 'axios'

export default function Container(props) {

    const [favouriteImages, setFavouriteImages] = useState([])
    const getAllImages = async () => {
        axios.get('http://localhost:3001/image')
            .then(images => {
                images.data.forEach(i => i.isSaved = true)
                setFavouriteImages(images.data)
        })
    }

    useEffect(() => {
        getAllImages()
    }, [])

    const handleSave = async (image) => {
        const allImages = [...favouriteImages]
        const imageFound = allImages.find(i => i._id === image._id)
        if(imageFound) {
            imageFound.isSaved = true
            setFavouriteImages(allImages)
            await axios.post(`http://localhost:3001/image/save`, image)
        } else {
            await axios.post(`http://localhost:3001/image/save`, image)
            getAllImages()
        }
        props.handleClick('Saved')
    }

    const handleDelete = async (imageId) => {
        const allImages = [...favouriteImages]
        const image = allImages.find(i => i._id === imageId)
        image.isSaved = false
        setFavouriteImages(allImages)
        await axios.delete(`http://localhost:3001/image/${imageId}`)
        props.handleClick('Removed')
    }

    return (
        <Fragment>
            <Route exact path='/' component={Home}/>
            <Route exact path='/search' 
                exact render={() => 
                    <Search 
                        favouriteImages={favouriteImages} 
                        handleSave={handleSave}
                        handleDelete={handleDelete}
                    />} 
            />
            <Route exact path='/favourites' 
                exact render={() => 
                    <Favourites 
                        favouriteImages={favouriteImages} 
                        handleSave={handleSave}
                        handleDelete={handleDelete}
                        getAllImages={getAllImages}
                    />} 
            />
            <Route path='/favourite/:imageId' 
                  exact render={({ match }) => 
                  <Favourites 
                    match={match} 
                    favouriteImages={favouriteImages} 
                    handleSave={handleSave}
                    handleDelete={handleDelete}
                    getAllImages={getAllImages}
                />}/>
        </Fragment>
    )
}