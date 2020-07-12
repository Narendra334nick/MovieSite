import React, { Component } from 'react'
import "../favourite/favourite.css";

export class favourite extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            movies:[]
        }
    }

    componentDidMount(){
        this.setState({
            movies:JSON.parse(localStorage.getItem("fav"))
        })
        //console.log(this.state.movies);
    }

    handleRemove = (event)=>{
        const id = event.target.id; 
        //console.log("from handleRemove",id);
        
        var favArray = localStorage.getItem("fav");
        favArray = JSON.parse(favArray);
        for(var i=0;i<favArray.length;i++){
            if(favArray[i].imdbID === id){
                favArray.splice(i,1);
                break;
            }
        }
        this.setState({
            movies:favArray
        })
        localStorage.setItem('fav',JSON.stringify(favArray));
       
    }

    
    render() {
        if(this.state.movies.length === 0){
            return(
                <div>
                    <h2>No Data Available</h2>
                </div>
            )
        }
        return (
            <div className="fav" >
                {
                    this.state.movies.map(item => (
                        <div key={item.imdbID} style={{display:"inline-block",height:'350px',width:"250px",       margin:"20px",border:"1px solid",paddingTop:"3px"}}>
                            <img src={item.Poster} style={{height:"250px",width:"190px"}} alt=""></img>
                            <div>{item.Title}</div>
                            <div><span className="remove" id={item.imdbID} onClick={this.handleRemove}>Remove</span></div>
                            {/* <div id={item.imdbID} onClick={this.remove}>Remove</div> */}
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default favourite
