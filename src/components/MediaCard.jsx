import React from 'react';
import {Link, useLocation} from 'react-router-dom'
import Media from './Media'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
        marginTop: '20px',
        marginBottom: '20px'
    },
    cards: {
        boxShadow: '0px 0px 1px white'
    },
    actions: {
        justifyContent: 'center'
    },
    img: {
        width: '100%',
        height: '40vh',
        boxShadow: '0px 1px 5px black'
    }
  });

export default function MediaCard(props) {
    const i = props.image
    const classes = useStyles();
    let location = useLocation().pathname

    const handleSave = () => {
        i.isSaved = true
        props.handleSave(i)
    }

    const handleDelete = () => {
        i.isSaved = false
        props.handleDelete(i._id)
    }

    if(location === '/' || location.includes('favourite/')) {
        return(
            <Grid item xs={11} container id={i.key}>
                <Card className={classes.card}>
                    <CardActionArea>
                        <Media link={i.imgUrl}/>
                        <CardHeader 
                            title={i.title}
                        />
                        <CardContent>
                            <Typography variant="body1" color="textSecondary" component="p">
                                {i.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        )
    } else {
        return (
                <Card className={`${classes.card} ${classes.cards}`} id={i.key}>
                    <CardActionArea>
                        {location.includes('search') 
                            ?   <img className={classes.img} src={i.imgUrl} />
                            :   <Link to={`/favourite/${i._id}`}>
                                    <img className={classes.img} src={i.imgUrl}/>
                                </Link>
                        }
                        <CardHeader 
                            title={i.title}
                        />
                    </CardActionArea>
                    <CardActions className={classes.actions}>
                        {i.isSaved                        
                            ?   <IconButton onClick={handleDelete} className={classes.icon}> <ThumbDownIcon /> </IconButton>
                            :   <IconButton onClick={handleSave} className={classes.icon}> <ThumbUpAltIcon/> </IconButton>
                        }
                    </CardActions> 
                </Card>
        )
    }
}