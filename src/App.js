import React, { useReducer } from 'react';
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
import { StateProvider } from './components/StateProvider';
import { reducer } from './components/PeopleState';
function App() {
  return (
    <StateProvider reducer={reducer} initialState={{loading:true}}>
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
    </StateProvider>
  );
}

export default App;
