import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from './components/Header/Header';
import * as Pages from "./pages"
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Pages.Homepage} />
            <Route exact path="/browse" component={Pages.Browse} />
            <Route exact path="/courses" component={Pages.Courses} />
            <Route exact path="/profile" component={Pages.Profile} />
            <Route component={Pages.Error404} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
