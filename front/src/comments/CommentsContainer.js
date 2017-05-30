import React from 'react';
import CommentsElements from './CommentsElements';

export default class CommentsContainer extends React.Component {
    render() {
        return (
            <div id="commentsContainer" className="well well-sm">
                <h1>Komentarze</h1>
                <CommentsElements />
            </div>
        );
    }


}