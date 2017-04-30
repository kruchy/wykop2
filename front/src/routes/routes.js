
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../App';
import Content from '../content/Content';
import PostPage from '../postcontent/PostContent';
import Login from '../login/SignIn';
import Register from '../login/SignUp';

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Content} />
        <Route path="post/:id" component={PostPage} />
        <Route path="signin" component={Login} />
        <Route path="signup" component={Register} />
    </Route>

);

export default routes;