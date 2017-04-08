import React, {Component} from "react";
import "./App.css";
import Bacon from "baconjs";

export default class App extends Component {

    state = {
    };

    componentDidMount() {
        const ticks = Bacon.interval(100);

    }

    render() {
        return (
            <div>Hello werld</div>
        );
    }
}

