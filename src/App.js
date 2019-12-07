import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './custom.scss';
import './App.css';

import Home from './pages/Home';
import Main from './pages/Main';

const App = () => {
  const [user, setUser] = useState();

  return (
    <Router>
      <div id="app">
        <Switch>
          <Route path="/main">
            <Main />
          </Route>
          <Route path="/">
            <Home user={user} setUser={setUser} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
