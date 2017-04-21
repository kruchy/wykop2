
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../App';
import Content from '../content/Content';
import PostPage from '../postcontent/PostContent';

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Content} />
        <Route path="post/:id" component={PostPage} />
    </Route>

);

export default routes;