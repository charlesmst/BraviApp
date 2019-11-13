import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import { reducer } from './reducer';
import { StateProvider } from './components/StateProvider';
import Page404 from './pages/Page404';
import PersonList from './pages/PersonList';
function App() {
  return (
    <StateProvider reducer={reducer} initialState={{ loading: true }}>
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
    </StateProvider>
  );
}

export default App;
