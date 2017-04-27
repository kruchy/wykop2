
import React from 'react';
import "../../css/App.css";


export default class NavBar extends React.Component {
    render() {


        return (
            <div>
            <nav>
                <a href="#">Home</a>
                <a href="#" className="selected">Blog</a>
            </nav>

            <ul>
                <li><a href="#">Login</a></li>
                <li><a href="#">Sign up</a></li>
            </ul>
                </div>
        );
    }
};
