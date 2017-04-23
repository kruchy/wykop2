
import React from 'react';
import PostList from './PostList.js';
import Pager from './Pager.js';


export default class Content extends React.Component {
    render() {
        return (
            <div className="content">
                <PostList />
                <Pager />
            </div>
        );
    }
};