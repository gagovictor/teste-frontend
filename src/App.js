import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Styles
//import 'bootstrap/dist/css/bootstrap.css';
import './assets/fonts/fonts.scss';
import './App.scss';

// Layouts
import healthStatus from './layouts/healthStatus';
import campaign from './layouts/campaign';
import notification from './layouts/notification';
import transaction from './layouts/transaction';

const routes = [
  {
    path: "/",
    component: healthStatus
  },
  {
    path: "/healthstatus",
    component: healthStatus
  },
  {
    path: "/campaign",
    component: campaign
  },
  {
    path: "/notification",
    component: notification
  },
  {
    path: "/transaction",
    component: transaction
  }
];

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

function App() {
  return (
    <Router>
      <div id="main">
        <div className="container">
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </div>
      </div>
    </Router>
  );
}

export default App;
