import React, { Component } from 'react';
import '../searchbox/searchbox.css';
import { withRouter } from 'react-router-dom';
import InputField from '../../globalComponents/InputTextField/index';
import { Grid, Button } from '@material-ui/core';
import Card from '../../globalComponents/card/index';

function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i].imdbID === obj) {
      return true;
    }
  }

  return false;
}

export class searchbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      type: '',
      year: '',
      array: [],
      isLoaded: false,
      error: false,
    };
  }

  componentDidMount() {
    if (localStorage && localStorage.length === 0) {
      console.log('empty');
      var favArray = [];
      var unFavArray = [];
      localStorage.setItem('fav', JSON.stringify(favArray));
      localStorage.setItem('unfav', JSON.stringify(unFavArray));
    }
  }

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({
      [name]: value,
    });
    //console.log(this.state);
  };

  handleSubmit = async () => {
    const { title, type, year } = this.state;
    //console.log(title);
    var favArray = JSON.parse(localStorage.getItem('fav'));
    const apiKey = 10425274;
    if (type === 'All') {
      var url = `https://www.omdbapi.com/?s=${title}&y=${year}&apikey=${apiKey}`;
    } else {
      var url = `https://www.omdbapi.com/?s=${title}&type=${type}&y=${year}&apikey=${apiKey}`;
    }

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.Response === 'True') {
          data.Search.forEach((item) => {
            item.redColor = false;
          });

          var favArray = JSON.parse(localStorage.getItem('fav'));
          console.log('favArray', favArray);
          if (favArray) {
            for (var i = 0; i < favArray.length; i++) {
              for (var j = 0; j < data.Search.length; j++) {
                if (favArray[i].imdbID === data.Search[j].imdbID) {
                  data.Search[j].redColor = true;
                }
              }
            }
          }
          this.setState({
            isLoaded: true,
            array: data.Search,
            error: false,
          });
        } else {
          this.setState({
            isLoaded: false,
            error: true,
            array: [],
          });
        }
        // console.log(this.state);
      });
  };

  handleFav = async (id) => {
    //fetched data from omdb site
    const movie = this.state.array;

    //changing the color of thumb by making redColor true
    movie.forEach((item) => {
      if (item.imdbID === id) {
        item.redColor = !item.redColor;
      }
    });

    const data = movie.find((item) => {
      return item.imdbID === id;
    });

    var favArray = await localStorage.getItem('fav');
    favArray = JSON.parse(favArray);
    console.log('favArray', favArray);

    const present = containsObject(id, favArray);

    if (present) {
      for (var i = 0; i < favArray.length; i++) {
        if (favArray[i].imdbID === id && favArray[i].redColor === true) {
          favArray[i].redColor = false;
        }
      }
    } else {
      favArray.push(data);
    }

    //removing false value
    for (var i = 0; i < favArray.length; i++) {
      if (favArray[i].redColor === false) {
        favArray.splice(i, 1);
      }
    }

    localStorage.setItem('fav', JSON.stringify(favArray));

    this.setState({
      array: movie,
    });
  };

  showInfo = (id) => {
    console.log('id', id);
    sessionStorage.setItem('movieId', id);
    setTimeout(() => {
      this.props.history.push('/movieInfo');
    }, 1000);
  };

  render() {
    return (
      <div style={{ margin: '8px' }}>
        <Grid container spacing={3} m={8}>
          <Grid item xs={12} sm={5} md={5}>
            <input
              type="text"
              placeholder="Movie Name"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </Grid>
          <Grid item xs={12} sm={3} md={3}>
            <input
              type="text"
              placeholder="Year"
              name="year"
              value={this.state.year}
              onChange={this.handleChange}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
            <div className="form-group">
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                name="type"
                value={this.state.type}
                onChange={this.handleChange}
              >
                <option>All</option>
                <option>Movie</option>
                <option>Series</option>
                <option>Episodes</option>
              </select>
            </div>
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
            <Button
              onClick={this.handleSubmit}
              variant="contained"
              color="primary"
            >
              Search
            </Button>
          </Grid>
        </Grid>
        <div className="showInfo">
          <Showdata
            state={this.state}
            handleFav={this.handleFav}
            handleRemove={this.handleRemove}
            showInfo={this.showInfo}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(searchbox);

const Showdata = (props) => {
  const { error, isLoaded, array } = props.state;

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'centre',
        }}
      >
        <h2>No Data Found...</h2>
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div>
        <h4>Search A Movie Name/Series/Episode...</h4>
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <Grid container spacing={2}>
          {array.map((item) => (
            <Grid item xs={12} sm={6} md={3}>
              <div
                key={item.imdbID}
              >
                <Card
                  imgUrl={item.Poster}
                  title={item.Title}
                  year={item.Year}
                  action={() => {
										props.showInfo(item.imdbID);
									}}
                  id={item.imdbID}
									redColor={item.redColor}
									handleFav = {()=>props.handleFav(item.imdbID)}
                />
              </div>
            </Grid>
          ))}
        </Grid>
      </React.Fragment>
    );
  }
};
