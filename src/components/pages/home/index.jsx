import React from "react";
// import Router from './router';\

import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import Sidebar from '../../Sidebar/index';
import BreadcrumbComponent from '../../Breadcrumb/index'
import Router from '../../../router';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



class Home extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Sidebar/>
        </Sider>
        <Layout className="site-layout">
          {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
          <Content style={{ margin: '0 16px' }}>
            {/* <BreadcrumbComponent path='test/123'/>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              Bill is a cat.
            </div> */}
            <BreadcrumbComponent path='test/123'/>
            <Router /> 
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
};

export default Home;