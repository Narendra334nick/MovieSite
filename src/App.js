import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import SearchBox from './components/searchbox/searchbox';
import Favourite from './components/favourite/favourite';
import UnFavourite from './components/unfavourite/unfavourite';
import MovieInfo from './components/movieInfo/movieinfo';
import Header from './components/Header/header';


function App() {
  return (
    <div className="App">
     <Router>
            <Header />
            <Switch>
              <Route exact path='/'>
                <SearchBox/>
              </Route>

              <Route path='/favourite'><Favourite /></Route>
              <Route path='/unfavourite'><UnFavourite /></Route>
              <Route path='/movieInfo'><MovieInfo /></Route>
            </Switch>
        </Router>  
    </div>
  );
}

export default App;
