import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AuthProvider from './auth/Auth';
import PrivateRoute from './auth/PrivateRoute';
import Header from './components/Header/Header';
import * as Pages from "./pages"
import './App.css';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Switch>
            <PrivateRoute exact path="/" component={Pages.Homepage} />
            <PrivateRoute exact path="/browse" component={Pages.Browse} />
            <PrivateRoute exact path="/courses" component={Pages.Courses} />
            <PrivateRoute exact path="/profile" component={Pages.Profile} />
            <Route exact path="/login" component={Pages.Login} />
            <Route exact path="/signup" component={Pages.Signup} />
            <Route exact path="/*" component={() => {
              window.location.href = "/"}} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    );
  }
}

export default App;
