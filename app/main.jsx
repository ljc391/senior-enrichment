'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import { Router, Route, hashHistory,browserHistory,  IndexRoute, IndexRedirect } from 'react-router';
import RootContainer from './components/RootContainer';
import {receivePosts} from './reducers/action-creators';
function loadPosts(){
    fetch('/api/posts')
    .then(function(res){
        return res.json();
    })
    .then(function(posts){
        const action = receivePosts(posts);
        store.dispatch(action);
    })
    .catch(function (err) {
      console.error(err)
    });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/" onEnter={loadPosts} component={RootContainer} />
    </Router>
  </Provider>,
  document.getElementById('main')
);