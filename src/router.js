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
import BookInfo from '../src/components/pages/Book/info'
import WordList from '../src/components/pages/Word/list'
import { Statistic } from "antd";


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
		path: "/article/list",
		component: ArticleList,
		routes: [
			{
				path: "/article/insert",
				component: ArticleEdit,
			},
			{
				path: "/article/update",
				component: BookInfo,
			}
		]
	},
	{
		path: '/word/list',
		component: WordList,
	},
	{
		path: "/book/list",
		component : BookList,
		routes: [
			{
				path: "/book/info/:id",
				component: BookInfo,
			},
			{
				path: "/article/update",
				component: ArticleEdit,
			}
		]
	}
];

/**渲染路由组件 */
export default function RouteConfigExample() {
	return (
		<Switch>
			{RouteWithSubRoutes(routes)}
		</Switch>
	);
}

/**
 * 递归生成路由结构
 * @param {路由树} routes 
 */
function RouteWithSubRoutes(routes) {
	let res = []
	routes.forEach((item, index) => {
		res.push(<Route key={Date.parse(new Date()) + index}  exact path={item.path} component={item.component} />)

		if(item.routes){
			res.push(RouteWithSubRoutes(item.routes)) 
		}
	});

	return (res)
}


