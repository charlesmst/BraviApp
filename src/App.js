import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import { reducer } from './components/PeopleState';
import { StateProvider } from './components/StateProvider';
import Page404 from './pages/Page404';
import PersonList from './pages/PersonList';
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
