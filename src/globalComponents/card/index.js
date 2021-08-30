import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    margin:4
  },
  subContainer: {
    padding: 8,
  },
});

export default function ImgMediaCard(props) {
  const classes = useStyles();

  const { imgUrl, title, description, action, id, year, redColor, handleFav } =
    props;
  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.subContainer}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="350"
          image={imgUrl}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography>{title} {year ? `:${year}`:null} </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Share
        </Button> */}
        {action && (
          <Button size="small" color="primary" onClick={action}>
            Learn More
          </Button>
        )}
        {handleFav && (
          <Button>
            <div>
              <span>
                <i
                  id={id}
                  className={'fa fa-thumbs-up ' + (redColor ? 'red' : 'cursor')}
                  style={{ fontSize: '36px' }}
                  onClick={handleFav}
                ></i>
              </span>
            </div>
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
