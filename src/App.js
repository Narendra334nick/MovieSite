import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import NavBar from './components/navbar/navbar';
import SearchBox from './components/searchbox/searchbox';
import Favourite from './components/favourite/favourite';
import UnFavourite from './components/unfavourite/unfavourite';
import MovieInfo from './components/movieInfo/movieinfo';


function App() {
  return (
    <div className="App">
     <Router>
            <NavBar/>
            
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
