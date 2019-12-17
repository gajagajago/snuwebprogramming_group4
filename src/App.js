import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import firebase from './firebase';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import purple from '@material-ui/core/colors/purple';

import './custom.scss';
import './App.css';

import Home from './pages/Home';
import MyCalendar from './pages/MyCalendar';
import FriendCalendar from './pages/FriendCalendar';

const App = () => {
  // const match = useRouteMatch();
  const [user, setUser] = useState();
  const theme = createMuiTheme({
    palette: {
      primary: blueGrey,
      secondary: purple,
    },
    status: {
      danger: 'orange',
    },
  });

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      setUser();
    }
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div id="app">
          <Switch>
            <Route path="/mycalendar">
              <MyCalendar user={user} />
            </Route>
            <Route path="/friendcalendar/:uid">
              <FriendCalendar user={user} />
            </Route>
            <Route path="/">
              <Home user={user} setUser={setUser} />
            </Route>
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;
