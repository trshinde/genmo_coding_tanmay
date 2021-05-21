import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const createStoreWithMiddleware = compose(applyMiddleware(thunk))(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducer)}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
