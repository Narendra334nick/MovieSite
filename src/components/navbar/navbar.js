import React, { Component } from 'react'
import '../navbar/navbar.css';
import {Link} from 'react-router-dom'

export class navbar extends Component {
    render() {
        return (
            <div className='navbar1'>
                <span className="navElements"><Link to ='/'><h4>Home</h4></Link></span>
                <span className="navElements"><Link to ='/favourite'><h4>Favourite</h4></Link></span>
                <span className="navElements"><Link to ='/unfavourite'><h4>UnFavourite</h4></Link></span>
                {/* <span>Unfavourite</span> */}
            </div>
        )
    }
}

export default navbar
