import React from 'react';

export default class CommentUpdates extends React.Component {

    render() {
        var comments = this.props.data.map(function (comment, index) {
        return (
            <div className="comment-body" key={comment.id}>
                    <div className="comment-text">
                        <b>{comment.username}</b>
                        <a href="#" className="comment-delete" value={index} data={comment.id} onClick={this.props.deleteComment} >X</a>
                        {comment.content}
                    </div>
                </div>
            )
        }, this);
        return (
            <div id="comments-wall">
                {comments}
            </div>
        );
    }
}