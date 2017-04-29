
import React from 'react';


export default class NavBar extends React.Component {
    render() {


        return (
            <div>
            <nav>
                <a href="#" className="selected">Home</a>
                <a href="#" >Nowy Blog</a>
                <a href="#" >Profil</a>

            </nav>

            <ul>
                <li><a href="#">Login</a></li>
                <li><a href="#">Sign up</a></li>
            </ul>
                </div>
        );
    }
};
