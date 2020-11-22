import React from 'react';
import {Link, useLocation} from 'react-router-dom'
import Media from './Media'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardActionArea, CardActions, CardContent, Grid, IconButton } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
        marginTop: '20px',
        marginBottom: '20px'
    },
    cards: {
        border: '0.1px groove #bca9f3'
    },
    actions: {
        justifyContent: 'center'
    },
    img: {
        width: '100%',
        height: '40vh'
    }
  });

export default function MediaCard(props) {
    const { image } = props
    const classes = useStyles();
    let location = useLocation().pathname

    const handleSave = () => {
        image.isSaved = true
        props.handleSave(i)
    }

    const handleDelete = () => {
        image.isSaved = false
        props.handleDelete(i._id)
    }

    if(location === '/' || location.includes('favourite/')) {
        return(
            <Grid item xs={11} container id={image.key}>
                <Card className={classes.card}>
                    <CardActionArea>
                        <Media link={image.imgUrl}/>
                        <CardHeader 
                            title={image.title}
                        />
                        <CardContent>
                            <Typography variant="body1" color="textSecondary" component="p">
                                {image.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        )
    } else {
        return (
                <Card className={`${classes.card} ${classes.cards}`} id={image.key}>
                    <CardActionArea>
                        {location.includes('search') 
                            ?   <img className={classes.img} src={image.imgUrl} />
                            :   <Link to={`/favourite/${i._id}`}>
                                    <img className={classes.img} src={image.imgUrl}/>
                                </Link>
                        }
                        <CardHeader 
                            title={image.title}
                        />
                    </CardActionArea>
                    <CardActions className={classes.actions}>
                        {image.isSaved                        
                            ?   <IconButton onClick={handleDelete} className={classes.icon}> <ThumbDownIcon /> </IconButton>
                            :   <IconButton onClick={handleSave} className={classes.icon}> <ThumbUpAltIcon/> </IconButton>
                        }
                    </CardActions> 
                </Card>
        )
    }
}