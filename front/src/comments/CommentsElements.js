import React, { PropTypes } from 'react';
import CommentForm from './CommentForm';
import CommentUpdates from './CommentUpdates';
import $ from 'jquery';


const mockData = {
    "data": [
        {
            "id": "0",
            "username": "Paweł",
            "content": "Komentarz"
        },
        {
            "id": "1",
            "username": "Paweł",
            "content": "Komentarz2"
        },
        {
            "id": "2",
            "username": "Paweł",
            "content": "Komentarz3"
        },
        {
            "id": "3",
            "username": "Paweł",
            "content": "Komentarz4"
        }
    ],
};



export default class CommentsElements extends React.Component {

    static contextTypes = {
        comments: PropTypes.array
    };

    constructor(props, context) {
        super(props);
        this.data = [];
        this.state = {
            data: context.comments
        };

        this.commentAjaxSubmit = this.commentAjaxSubmit.bind(this);

    }


    componentDidMount() {


    }

    commentAjaxSubmit(formData) {
        $.ajax({
            url: "/comment",
            type: "post",
            data: formData,
            success: function (response) {
                var comments = this.state.data;
                var newComment = comments.concat([response.comment]);
                this.setState({ data: newComment });
                
            }.bind(this)

        });
    }

    render() {
        return (
            <div>
                <div className="comment-form">
                    <CommentForm onCommentSubmit={this.commentAjaxSubmit} />
                </div>
                {console.log(this.context.comments)}
                <CommentUpdates data={this.state.data} />
            </div>

        );
    }
}