import React, { Component } from 'react';
import Loader from '../../globalComponents/KenLoader/index';

const Movieinfo = (props) => {
    const [movie,setMovie] = React.useState({});
    const [loader,setLoader] = React.useState(true);

    const getMovieData = async () =>{
        const id = sessionStorage.getItem('movieId');
        const apiKey = 10425274;
        const url = `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`
        const result = await fetch(url)
        const data = await result.json();
        setMovie(data)
        setLoader(false);
    }

    React.useEffect(()=>{
        getMovieData();
    },[]);

  return (
    <div style={{ marginTop: '20px' }}>
        {
            loader && (<Loader/>)
        }
      <img src={movie.Poster} alt=""></img>
      <div>Name:{movie.Title}</div>
      <div>Actors:{movie.Actors}</div>
      <div>Director:{movie.Director}</div>
      <div>Genere:{movie.Genre}</div>
      <div>Language:{movie.Language}</div>
      <div>Year:{movie.Year}</div>
      <div>Type:{movie.Type}</div>
    </div>
  );
};

// export class movieinfo extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             movie:{},
//             loader:false
//         }
//     }

//     async componentDidMount(){
//         const id = sessionStorage.getItem('movieId');
//         const apiKey = 10425274;
//         const url = `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`
//         const result = await fetch(url)
//         const data = await result.json();
//         //console.log(data);

//         this.setState({
//             movie:data
//         })
//         //console.log(this.state);
//     }

//     render() {
//         return (
//             <div style={{marginTop:"20px"}}>
//                 <img src={this.state.movie.Poster} alt=""></img>
//                 <div>Name:{this.state.movie.Title}</div>
//                 <div>Actors:{this.state.movie.Actors}</div>
//                 <div>Director:{this.state.movie.Director}</div>
//                 <div>Genere:{this.state.movie.Genre}</div>
//                 <div>Language:{this.state.movie.Language}</div>
//                 <div>Year:{this.state.movie.Year}</div>
//                 <div>Type:{this.state.movie.Type}</div>
//             </div>
//         )
//     }
// }

export default Movieinfo;
