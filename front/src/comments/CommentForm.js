import React, { PropTypes } from 'react';
import $ from 'jquery'
import Auth from '../login/Auth'

export default class CommentForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_comment: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const content = encodeURIComponent(this.state.user_comment);
        const postid = encodeURIComponent(this.context.postid);
        const formData = `postId=${postid}&content=${content}&token=${Auth.getToken()}`;

        $.ajax({
            url: "/comment",
            type: "post",
            data: formData,
            success: function (response) {
                console.log(response)
                this.setState({ user_comment: '' });
            }.bind(this)

        });

    }

    handleChange(event) {
        this.setState({ user_comment: event.target.value });
    }

    static contextTypes = {
        postid: PropTypes.string
    };

    render() {
        return (
            <form method="post" onSubmit={this.handleSubmit}>
                <textarea onChange={this.handleChange} value={this.state.user_comment} className="comment-box" />
                <button type="submit" className="btn btn-primary btn-lg">Wyślij</button>
            </form>
        );
    }
}