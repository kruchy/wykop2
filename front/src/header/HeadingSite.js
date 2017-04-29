
import React from 'react';
import { Link } from 'react-router';
import NavBar from '../navbar/NavBar';
import logo from '../../img/wykop-2.jpg';



export default class HeadingSite extends React.Component {
    render() {
        return (          
                <div className="header-limiter">

                    <h1><Link to="/">
                          <img className="logo" alt="" src={logo} />
                     </Link></h1>

                    <NavBar/>
                </div>


        );
    }
};