import React, { Component } from 'react';
import { Button } from 'reactstrap';
import '../searchbox/searchbox.css';
import {withRouter} from "react-router-dom";

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
       super(props)
   
       this.state = {
            title:"",
            type:"",
            year:"",
            array:[],
            isLoaded:false,
            error:false
       }
   }
   
    componentDidMount(){
        if(localStorage.length === 0){
            console.log('empty');
            var favArray = [];
            var unFavArray = [];
            localStorage.setItem('fav',JSON.stringify(favArray));
            localStorage.setItem('unfav',JSON.stringify(unFavArray));
        }
    }

    handleChange = (event) =>{
        let name = event.target.name;
        let value = event.target.value;
        
        this.setState({
            [name] : value
        })
        //console.log(this.state);
    }
   
  

    handleSubmit = async ()=>{
        const {title,type,year} = this.state
        //console.log(title);
        var favArray = JSON.parse(localStorage.getItem('fav'));
        const apiKey = 10425274;
        if(type ==="All"){
            var url = `https://www.omdbapi.com/?s=${title}&y=${year}&apikey=${apiKey}`;
        }else{
            var url = `https://www.omdbapi.com/?s=${title}&type=${type}&y=${year}&apikey=${apiKey}`;
        }
        
        fetch(url)
        .then(response=>{
            return response.json(); 
        })
        .then((data)=>{
            if(data.Response ==="True"){
                
                data.Search.forEach((item)=>{
                    item.redColor = false;
                })

                var favArray = JSON.parse(localStorage.getItem('fav'));
                console.log(favArray);
                for(var i=0;i<favArray.length;i++){
                    for(var j=0;j<data.Search.length;j++){
                        if(favArray[i].imdbID == data.Search[j].imdbID){
                            data.Search[j].redColor = true;
                        }
                    }
                }

                this.setState({
                    isLoaded:true,
                    array:data.Search,
                    error:false
                })
               
            }else{
                this.setState({
                    isLoaded:false,
                    error:true,
                    array:[]
                })
            }
         // console.log(this.state);
            
        })
    }

    handleFav = (event)=>{
        const id = event.target.id;
        //fetched data from omdb site
        const movie = this.state.array;
        
        //changing the color of thumb by making redColor true
        movie.forEach((item)=>{
            if(item.imdbID === id){
                item.redColor = !item.redColor;
            }
        });

        
        const data = movie.find(item=>{
            return item.imdbID === id;
        });

        var favArray = localStorage.getItem("fav");
        favArray = JSON.parse(favArray);

        const present = containsObject(id,favArray);
        
        if(present){
            for(var i=0;i<favArray.length;i++){
                if(favArray[i].imdbID === id && favArray[i].redColor === true){
                   favArray[i].redColor = false;
                }
            }
        }else{
            favArray.push(data);
        }

        
        //removing false value
        for(var i=0;i<favArray.length;i++){
            if(favArray[i].redColor === false){
                favArray.splice(i,1);
            }
        }
        
        localStorage.setItem('fav',JSON.stringify(favArray));
        
        this.setState({
            array:movie
        });
        
    }
    
    showInfo = (event)=>{
        const id = event.target.id;
        sessionStorage.setItem('movieId',id);
        setTimeout(()=>{
            this.props.history.push('/movieInfo');
        },1000);
    }
   
    render() {
     
        return (
            <div style={{height:"1000px"}} >
                <div className="searchbox">
                    <input type="text"
                        placeholder='Movie Title'
                        onChange = {this.handleChange}
                        name = "title"
                        value={this.state.title}
                        className="input"
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <form style={{display:"inline-block",width:"100px",margin:"0 auto"}}>
                        <div className="form-group"> 
                            
                            <input type="text"
                            placeholder="Year"
                            name="year"
                            value={this.state.year}
                            onChange={this.handleChange}
                             className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                    </form>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <form style={{display:"inline-block",width:"100px",margin:"0 auto"}}>
                        
                        <div className="form-group">
                            <select className="form-control" id="exampleFormControlSelect1"
                            name="type"
                            value={this.state.type}
                            onChange={this.handleChange}>
                                <option>All</option>
                                <option>Movie</option>
                                <option>Series</option>
                                <option>Episodes</option>
                            </select>
                        </div>
                    </form>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    
                    <Button color="primary" onClick={this.handleSubmit}>Search</Button>{' '}

                </div> 

                <div className='showInfo'>
                    <Showdata state={this.state} handleFav={this.handleFav} handleRemove={this.handleRemove} showInfo={this.showInfo} />
                   
                </div>

            </div>
        )
    }
}

export default withRouter(searchbox);


const Showdata =(props) => {
   // console.log(props);
    const {error,isLoaded,array} = props.state;
    //console.log(error,isLoaded,array);
    if(error){
        return(
            <div style={{display:"flex",justifyContent:"center",alignItems:"centre"}}>
                <h2>No Data Found</h2>
            </div>
        )
    }else if(!isLoaded){
        return(
            <div style={{display:"flex",justifyContent:"center"}}><h4>Search A Movie Name/Series/Episode</h4></div>
        )
    }else{
        return(
            <React.Fragment>
                 {
                        
                        array.map(item=>(
                                
                            <div key={item.imdbID} style={{display:"inline-block",height:'350px',width:"250px",margin:"20px",border:"1px solid",paddingTop:"3px"}}>
                            <img src={item.Poster} style={{height:"250px",width:"190px"}} alt=""></img>
                            <div>
                                <span className="info" id={item.imdbID} onClick={props.showInfo}> {item.Title}:{item.Year} </span>
                            </div>
                                <div>
                                    <span><i id={item.imdbID} className={"fa fa-thumbs-up "+(item.redColor ? 'red' : 'cursor')} style={{fontSize:"36px"}} onClick={props.handleFav}></i></span>&nbsp;&nbsp;&nbsp;
                                    {/* <span><i id={item.imdbID} className="fa fa-thumbs-down cursor" style={{fontSize:"36px"}} onClick={props.handleUnFav}></i></span> */}
                                    
                                </div>
                            </div>
                        
                        ))
                    }   
            </React.Fragment>
        )
    }
    
}

