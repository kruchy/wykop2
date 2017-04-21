
import React from 'react';
import { Link } from 'react-router';

var postStyle = {
    width: '1000px',
    margin: '0 auto',
};

var dateStyle = {
    fontFamily: "Lora,'Times New Roman',serif",
    fontSize: '12px',
    color: 'gray',
};

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
            <div className="post" style={postStyle}>
                <Link to={`/post/${this.props.id}`}>
                    <h1 className="title" id={this.props.id}>
                        {this.props.title}
                    </h1>
                    {this.props.children}
                </Link>
                <br>
                </br>
                <p style={dateStyle}>
                    {"Posted on " + thisDate.toString()}
                </p>
                <hr>
                </hr>
            </div>
        );
    }
};
