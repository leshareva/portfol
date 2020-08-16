import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import App from './App'
import { store } from './store';


ReactDOM.render(
  <Provider store={store} >
    <Router>
      <Route exact={true} path="/" render={() => <App type="web" />} />
      <Route exact={true} path="/portfol/vk/:rubric_id" render={({ match }) => <App type="vk" rubric_id={match.params.rubric_id} />} />
      <Route exact={true} path="/portfol/:rubric_id/user/:vk_id" render={({ match }) => <App type="web" vk_id={match.params.vk_id} rubric_id={match.params.rubric_id}/>} />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
