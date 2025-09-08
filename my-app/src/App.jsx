import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RegistrationApp from "./RegistrationApp";
import HomePage from "./pages/Homepage";
import AnotherPage from "./pages/Registration";
export default function App() {
  
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/register" component={RegistrationApp} />
        <Route path="/another" component={AnotherPage} />
      </Switch>
    </Router>
  );
}
