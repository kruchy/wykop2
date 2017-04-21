import React from 'react';
import ReactDOM from 'react-dom';
//import AppRoutes from './routes/AppRoutes';
//import Route from './routes/routes';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './App';
import Content from './content/Content';
import PostPage from './postcontent/PostContent';

import './index.css';

    ReactDOM.render(<Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Content} />
            <Route path="post/:id" component={PostPage} />
        </Route>
    </Router>, document.getElementById('container'));
