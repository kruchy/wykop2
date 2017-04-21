
import React from 'react';
import PostList from './PostList.js';
import Pager from './Pager.js';

/*var contentStyle = {
    width: '1200px',
    margin: '0 auto',
};*/

export default class Content extends React.Component {
    render() {
        return (
            <div className="content" /*style={contentStyle}*/>
                <PostList />
                <Pager />
            </div>
        );
    }
};