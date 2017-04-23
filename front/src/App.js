import React from "react";
import "../css/App.css";
import NavBar from './navbar/NavBar.js';
import Header from './header/Header.js';


export default class App extends React.Component {

    render() {
        return (
            <div className="mainContainer">
                <NavBar />
                <Header />
                {this.props.children}
            </div>
        );
    }
};
