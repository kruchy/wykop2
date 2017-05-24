
import React from 'react';
import $ from 'jquery'



export default class PostContent extends React.Component {
    constructor(props) {
        super(props);
        this.data = [];
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        $.ajax({
            url: "/posts",
            type: "get",
            data: {
                id: this.props.params.id
            },
            success: function (response) {
                this.setState({ data: response["post"] });
            }.bind(this),

            error: function (response) {
                console.log(response);
            }

        });
    }

    render() {
        const thisDate = new Date();
        return (
            <div className="postContent">
                <h1>
                    {this.state.data.title}
                </h1>
                <hr>
                </hr>
                {this.state.data.content}
                <br>
                </br>
                <p className="datePost">
                    {"Posted on " + thisDate.toUTCString()}
                </p>
            </div>
        );
    }
};
