
import React from 'react';
import { Link } from 'react-router';
import "../../css/App.css";

export default class PostItem extends React.Component {
    constructor(props) {
        super(props);
        this.id = "";
        this.state = {
            id: this.props.id
        };
    }


    render() {
        var thisDate = new Date(this.props.date);
        return (
            <div className="postContent">
                <Link to={`/post/${this.props.id}`}>
                    <h1 className="title" id={this.props.id}>
                        {this.props.title}
                    </h1>
                    {this.props.children}
                </Link>
                <br>
                </br>
                <p className="datePost">
                    {"Posted on " + thisDate.toString()}
                </p>
                <hr>
                </hr>
            </div>
        );
    }
};
