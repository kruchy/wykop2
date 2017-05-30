import React, { PropTypes } from 'react';
import CommentForm from './CommentForm';
import CommentUpdates from './CommentUpdates';


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
    constructor(props, context) {
        super(props);
        this.data = [];
        this.state = {
            data: []
        };
    }

    static contextTypes = {
        comments: PropTypes.array
    };

    componentDidMount() {


    }
    render() {
        return (
            <div>
                <div className="comment-form">
                    <CommentForm />
                </div>
                {console.log(this.context.comments)}
                <CommentUpdates data={this.context.comments} />
            </div>

        );
    }
}