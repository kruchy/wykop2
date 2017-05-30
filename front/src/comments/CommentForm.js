import React from 'react';

export default class CommentForm extends React.Component {

    render() {
        return (
            <form method="post" onSubmit={this.handleSubmit}>
                <textarea className="comment-box"/>
                <button type="submit" className="btn btn-primary btn-lg">Wyślij</button>
            </form>
        );
    }
}