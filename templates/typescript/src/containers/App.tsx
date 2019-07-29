import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './home';
import Admin from './admin';

type RootProps = {
  store: object,
}
// All routes define here.
const App: React.FC<RootProps> = ({ store }) => (<Provider store={store}>
  <Router>
    <Route exact path='/' component={Home} />
    <Route path={'/admin'} component={Admin} />
  </Router>
</Provider>);

export default App;