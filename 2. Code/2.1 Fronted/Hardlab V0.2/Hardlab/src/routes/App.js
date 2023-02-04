import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import DashboardAdmin from "../pages/DashboardAdmin";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/dashboard" component={Dashboard}/>
      <Route exact path="/dashboardAdmin" component={DashboardAdmin}/>
      
    </Switch>
  </BrowserRouter>
);

export default App;
