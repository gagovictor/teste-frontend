import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Styles
//import 'bootstrap/dist/css/bootstrap.css';
import './assets/fonts/fonts.scss';
import './App.scss';

// Layouts
import healthStatus from './layouts/healthStatus';
import campaigns from './layouts/campaigns';
import Footer from './layouts/footer';

const routes = [
  {
    path: ["/", "/healthstatus"],
    component: healthStatus,
    data : {
      title : 'Health Status',
      api_url : 'http://pmweb.agencia.pmweb.com.br/teste-frontend/api/intranet/healthstatus.json'
    },
  },
  {
    path: "/campaigns",
    component: campaigns,
    data : {
      title : 'Campaigns',
      api_url : 'http://pmweb.agencia.pmweb.com.br/teste-frontend/api/intranet/campaigns.json'
    },
  },
  {
    path: "/notification",
    component: campaigns,
    data : {
      title : 'Notification',
      api_url : 'http://pmweb.agencia.pmweb.com.br/teste-frontend/api/intranet/notification.json'
    },
  },
  {
    path: "/transaction",
    component: campaigns,
    data : {
      title : 'Transaction',
      api_url : 'http://pmweb.agencia.pmweb.com.br/teste-frontend/api/intranet/transaction.json'
    },
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
        <route.component {...props} route_data={route.data} />
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
      <Footer />
    </Router>
  );
}

export default App;
