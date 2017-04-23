
import React from 'react';
import "../../css/App.css";


export default class NavBar extends React.Component {
    render() {


        return (
            <div className="navBar">
                <ul className="navMenu">
                    <li style={{ display: 'inline' }}>
                        <a href="./index.html" className="navItem">
                            HOME
            </a>
                    </li>
                    <li style={{ display: 'inline' }}>
                        <a href="" className="navItem">
                            ABOUT
            </a>
                    </li>
                    <li style={{ display: 'inline' }}>
                        <a href="" className="navItem">
                            CONTACT
            </a>
                    </li>
                </ul>
            </div>
        );
    }
};
