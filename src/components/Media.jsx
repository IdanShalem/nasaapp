import React from 'react';
import ReactPlayer from 'react-player'
import CardMedia from '@material-ui/core/CardMedia';


export default function Media(props) {
    
    if(props.link.includes('youtube.com')){
        return (
            <CardMedia>
                <ReactPlayer url={props.link} width='100%'/>
            </CardMedia>
        )
    } else {
        return (
            <CardMedia
                component="img"
                height='50%' width='100%'
                image={props.link}
            />
        )
    }
    
}