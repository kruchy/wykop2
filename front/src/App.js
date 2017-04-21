import React from "react";
import "./App.css";
import NavBar from './navbar/NavBar.js';
import Header from './header/Header.js';
import Content from './content/Content.js';


var mainContainerStyle = {
    fontFamily: "'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif",
};

export default class App extends React.Component {

    render() {
        return (
            <div className="mainContainer" style={mainContainerStyle}>
                <NavBar />
                <Header />
                {this.props.children}
            </div>
        );
    }
};
