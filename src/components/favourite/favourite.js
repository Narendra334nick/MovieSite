import React, { Component } from 'react';
import '../favourite/favourite.css';
import { withRouter } from 'react-router-dom';
import Card from '../../globalComponents/card/index';

export class favourite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    this.setState({
      movies: JSON.parse(localStorage.getItem('fav')),
    });
    //console.log(this.state.movies);
  }

  handleRemove = (id) => {
    var favArray = localStorage.getItem('fav');
    favArray = JSON.parse(favArray);
    for (var i = 0; i < favArray.length; i++) {
      if (favArray[i].imdbID === id) {
        favArray.splice(i, 1);
        break;
      }
    }

    localStorage.setItem('fav', JSON.stringify(favArray));
    setTimeout(() => {
      this.setState({
        movies: favArray,
      });
    }, 200);
  };

  showInfo = (id) => {
    console.log('id', id);
    sessionStorage.setItem('movieId', id);
    setTimeout(() => {
      this.props.history.push('/movieInfo');
    }, 1000);
  };

  render() {
    if (this.state.movies.length === 0) {
      return (
        <div>
          <h2>No Data Available</h2>
        </div>
      );
    }
    return (
      <div className="fav">
        {this.state.movies.map((item) => (
          <div
            key={item.imdbID}
          >
            <Card
              imgUrl={item.Poster}
              title={item.Title}
              year={item.Year}
              id={item.imdbID}
              redColor={item.redColor}
              handleFav={() => this.handleRemove(item.imdbID)}
              action={() => {
                this.showInfo(item.imdbID);
            }}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(favourite);
