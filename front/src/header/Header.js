
import React from 'react';
import "../../css/App.css";
import HeadingSite from './HeadingSite.js';

export default class Header extends React.Component {
    render() {
        return (
        //    <div className="header">
            <header className="header-login-signup">

                <HeadingSite />

            </header>
   //           </div>
        );
    }
};