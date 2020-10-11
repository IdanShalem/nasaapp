import React from 'react';
import ReactPlayer from 'react-player'
import CardMedia from '@material-ui/core/CardMedia';


export default function Media(props) {
    return(
       <CardMedia
            component="img"
            height='50%' width='50%'
            image={props.link}
        />
        // <CardMedia
        //     classes={'MuiCardMedia-media'}
        // >
        //     <ReactPlayer url='https://www.youtube.com/watch?v=Qz6XNSB0F3E' height='50%' width='50%'/>
        // </CardMedia>
        /*   */
    )
    
    // if(props.link.includes('youtube.com/watch')){
    //     return <iframe src={props.link} />
    // } else {
    //     return <img src={props.link} alt=""/>
    // }
    
}