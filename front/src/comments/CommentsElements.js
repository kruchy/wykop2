import React from 'react';
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
    constructor(props) {
        super(props);
        this.data = [];
        this.state = {
            data: []
        };
    }
    componentDidMount() {
        this.setState({ data: mockData["data"] });
    }
    render() {
        return (
            <div>
                <div className="comment-form">
                    <CommentForm />
                </div>
                <CommentUpdates data={this.state.data} />
            </div>

        );
    }
}