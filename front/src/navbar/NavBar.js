import React from 'react';
import { Link } from 'react-router';
import Auth from '../login/Auth'

export default class NavBar extends React.Component {
    render() {


        return (
            <div>
                    {Auth.isUserAuthenticated() ? (
                        <nav>
                            <Link to={"/"} className="selected" > Home</Link>
                            <Link to={"/add_post"}>Nowy post</Link>
                            <a href="#" >Profil</a>
                        </nav>

                    ) : (
                            <nav>
                                <Link to={"/"} className="selected">Home</Link>
                            </nav>
                        )}

                    {Auth.isUserAuthenticated() ? (
                        <ul>
                            <li>
                                <Link to={"logout"}>
                                    Log out
                                </Link>
                            </li>
                        </ul >
                    ) : (
                            <ul>
                                <li>
                                    <Link to={"signin"}>
                                        Login
                                    </Link >
                                </li >
                                <li>
                                    <Link to={"signup"}>
                                        Sign up
                                    </Link >
                                </li >
                            </ul >
                        )}
                </div>
        );
    }
};
