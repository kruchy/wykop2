
import React from 'react';
import $ from 'jquery'
import CommentsContainer from '../comments/CommentsContainer';



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
        console.log(this.state.data)
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
                    {"Posted on " + this.state.data.created_at}
                </p>
                {(this.state.data.length !== 0) &&
                    <CommentsContainer comments={this.state.data.comments} postid={this.state.data._id} />
                }
            </div>
        );
    }
};
