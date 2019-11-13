import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PersonList from './pages/PersonList'
import Page404 from './pages/Page404'
function App() {
  return (
    <div>
      <Router>
        <Switch>
            <Route path="/">
            
              <PersonList />
            </Route>
            <Route path="*">
              <Page404 />
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
