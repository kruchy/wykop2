
import React from 'react';
import "../../css/App.css";



export default class PostContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Hello blog 1",
            content: "Silent sir say desire fat him letter. \
      Sportsman do offending supported extremity breakfast by listening. \
      Decisively advantages nor expression unpleasing she led met. \
      Estate was tended ten boy nearer seemed. \
      As so seeing latter he should thirty whence. \
      Steepest speaking up attended it as. \
      Made neat an on be gave show snug tore.",
            date: "2012-04-23T18:25:43.511Z",
        };
    }

    render() {
        var thisDate = new Date(this.state.date);
        return (
            <div className="postContent">
                <h1>
                    {this.state.title}
                </h1>
                <hr>
                </hr>
                {this.state.content}
                <br>
                </br>
                <p className="datePost">
                    {"Posted on " + thisDate.toUTCString()}
                </p>
            </div>
        );
    }
};
