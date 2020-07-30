import React from "react";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";


import Welcome from '../src/components/pages/Welcome/index';
import ArticleList from '../src/components/pages/Article/index'
import ArticleEdit from '../src/components/pages/Article/edit'
import BookList from '../src/components/pages/Book/list'

// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.

// We are going to use this route config in 2
// spots: once for the sidebar and once in the main
// content section. All routes are in the same
// order they would appear in a <Switch>.
// const routes = [

// 	{
// 	  path: "/welcome",
// 	  component: Welcome
// 	},
// 	{
// 		path: "/article",
// 		component: ArticleList,
// 		// routes: [
// 		// 	{
// 		// 		path: "/article/insert",
// 		// 		component: ArticleEdit,
// 		// 	},
// 		// 	{
// 		// 		path: "/article/update",
// 		// 		component: Bus,
// 		// 	}
// 		// ]
// 	},
// 	{
// 		path: "/book/list",
// 		component : BookList
// 	},
// 	// {
// 	// 	path: "/",
// 	// 	component:Welcome
// 	// }
// ];

  
export default function RouteConfigExample() {
	return (
		<div>
		  <Switch>
			<Route exact path="/">
					<ArticleEdit />
			</Route>
			<Route  path="/welcome">
					<Welcome />
			</Route>
			<Route  path="/article">
					<ArticleList />
			</Route>
			<Route  path="/test" component={ArticleEdit} />
					{/* <ArticleEdit /> */}
			{/* <Route path="/article" component={ArticleList}></Route>
			<Route path="/article/insert" component={ArticleEdit}></Route> */}
		  </Switch>
		</div>
	);
  }

  			{/* {routes.map((route, i) => (
			  <RouteWithSubRoutes key={i} {...route} />
			))} */}
  
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