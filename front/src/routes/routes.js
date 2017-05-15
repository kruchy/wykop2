import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../App';
import Content from '../content/Content';
import PostPage from '../postcontent/PostContent';
import Login from '../login/SignIn';
import Register from '../login/SignUp';
import Auth from '../login/Auth'

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Content} />
        <Route path="post/:id" component={PostPage} />
        <Route path="signin" component={Login} />
        <Route path="signup" component={Register} />
        <Route path="logout" onEnter={(nextState, replace) => {
            Auth.deauthenticateUser();
            replace('/');
        }}/>
    </Route>

);

export default routes;