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
const routes = [
	{
		path: "/",
		component:Welcome
	},
	{
	  path: "/welcome",
	  component: Welcome
	},
	{
		path: "/article",
		component: ArticleList,
		routes: [
			{
				path: "/article/insert",
				component: ArticleEdit,
			},
			{
				path: "/article/update",
				component: ArticleEdit,
			}
		]
	},
	{
		path: "/book/list",
		component : BookList
	}
];

  
export default function RouteConfigExample() {
	return (
		<Switch>
			{routes.forEach((item,index) => {
				<Route  exact path={item.path} component={item.component} />
			})}
		</Switch>

	);
  }

  			{/* {routes.map((route, i) => (
			  <RouteWithSubRoutes key={i} {...route} />
			))} */}
  

// function RouteWithSubRoutes(props) {


// 	return(
// 		<Switch>
// 		{
// 			props.test.forEach((item,index) => {
// 				var timestamp = Date.parse(new Date());
// 				{<Route key={timestamp + index} exact path={item.path} component={item.component} />}
// 				if(item.routes){
// 					{<RouteWithSubRoutes test = {item.routes} />}
// 				}
// 			})
// 		}
// 	</Switch>
// 	)

// }