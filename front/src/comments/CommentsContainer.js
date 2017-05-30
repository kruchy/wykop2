import React, { PropTypes } from 'react';
import CommentsElements from './CommentsElements';

export default class CommentsContainer extends React.Component {

    static childContextTypes = {
        comments: PropTypes.array,
        postid: PropTypes.string
    };

    getChildContext() {
        console.log(this.props)
        return {
            comments: this.props.comments,
            postid: this.props.postid
        };
    }

    render() {
        return (
            <div id="commentsContainer" className="well well-sm">
                <h1>Komentarze</h1>
                <CommentsElements/>
            </div>
        );
    }


}