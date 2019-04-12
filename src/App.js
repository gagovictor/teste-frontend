import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Styles
import 'bootstrap/dist/css/bootstrap.css';
import './assets/fonts/fonts.scss';
import './App.scss';

// Layouts
import healthStatus from './layouts/healthStatus';
import campaign from './layouts/campaign';
import notification from './layouts/notification';
import transaction from './layouts/transaction';
import contactModal from './layouts/contactModal';

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
  },
  {
    path: "/contact",
    component: contactModal
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
      <div className="container">
        <div id="mainNavigation" className="container">
          <ul>
            <li>
              <Link to="/healthstatus">Health Status</Link>
            </li>
            <li>
              <Link to="/campaign">Campaign</Link>
            </li>
            <li>
              <Link to="/notification">Notification</Link>
            </li>
            <li>
              <Link to="/transaction">Transaction</Link>
            </li>
            <li>
              <Link to="/contact">Contato</Link>
            </li>
          </ul>
        </div>
        <div id="main">
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </div>
      </div>
    </Router>
  );
}

export default App;
