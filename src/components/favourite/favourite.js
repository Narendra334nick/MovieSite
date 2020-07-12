import React, { Component } from 'react'

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
    
    render() {
        if(this.state.movies.length === 0){
            return(
                <div>
                    <h2>No Data Available</h2>
                </div>
            )
        }
        return (
            <div style={{display:"grid",gridTemplateColumns:"auto auto auto auto"}}>
                {
                    this.state.movies.map(item => (
                        <div key={item.imdbID} style={{display:"inline-block",height:'350px',width:"250px",       margin:"20px",border:"1px solid green",paddingTop:"3px"}}>
                            <img src={item.Poster} style={{height:"250px",width:"190px"}} alt=""></img>
                            <div>{item.Title}</div>
                            {/* <div id={item.imdbID} onClick={this.remove}>Remove</div> */}
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default favourite
