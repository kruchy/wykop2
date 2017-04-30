
import React from 'react';
import { Link } from 'react-router';

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
                    <li><Link to={"signin"}>
                        Login
                    </Link></li>
                    <li><Link to={"signup"}>
                        Sign up
                    </Link></li>
            </ul>
                </div>
        );
    }
};
