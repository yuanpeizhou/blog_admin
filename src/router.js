import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


import Welcome from '../src/components/pages/Welcome/index';

// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.

// We are going to use this route config in 2
// spots: once for the sidebar and once in the main
// content section. All routes are in the same
// order they would appear in a <Switch>.
const routes = [
	{
	  path: "/welcome",
	  component: Welcome
	},
	// {
	//   path: "/tacos",
	//   component: Tacos,
	//   routes: [
	// 	{
	// 	  path: "/tacos/bus",
	// 	  component: Bus
	// 	},
	// 	{
	// 	  path: "/tacos/cart",
	// 	  component: Cart
	// 	}
	//   ]
	// }
];
  
  export default function RouteConfigExample() {
	return (
	  <Router>
		<div>
		  <Switch>
			{routes.map((route, i) => (
			  <RouteWithSubRoutes key={i} {...route} />
			))}
		  </Switch>
		</div>
	  </Router>
	);
  }
  
  // A special wrapper for <Route> that knows how to
  // handle "sub"-routes by passing them in a `routes`
  // prop to the component it renders.
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
  
  

