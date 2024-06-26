import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.css';
import ChatDialogWindow from './containers/chatDialogWindow/chatDialogWindow';
import AuthorisationWindow from './containers/authorisationWindow/authorisationWindow';

const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/auth" component={AuthorisationWindow} />
      <Route path="/reg" component={AuthorisationWindow} />
      <Route path="/chat" component={ChatDialogWindow} />
      <Redirect to="/auth" />
    </Switch>
  </div>
);

export default App;
