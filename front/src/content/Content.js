
import React from 'react';
import PostList from './PostList.js';
import Pager from './Pager.js';
import PopularPosts from './PopularPosts.js';


export default class Content extends React.Component {
    render() {
        return (

	<div className="main">
                <PostList />
                <PopularPosts />
                <Pager />
    </div>

        );
    }
};