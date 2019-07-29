import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import Home from './home';
import Admin from './admin';

// All routes define here.
const App = ({ store }) => (<Provider store={store}>
  <Router>
    <Route exact path='/' component={Home} />
    <Route path='/admin' component={Admin} />
  </Router>
</Provider>);

App.propTypes = {
  store: PropTypes.object.isRequired,
};
export default App;
