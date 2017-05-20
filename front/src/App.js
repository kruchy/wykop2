import React from "react";
import Header from './header/Header.js';


export default class App extends React.Component {

    render() {
        return (
<div className="page">
                <Header />
        <div className="wrap">
                {this.props.children}
        </div>
</div>
        );
    }
};
