import React from "react";

import { Layout } from 'antd';
import Sidebar from '../../Sidebar/index';
import Router from '../../../router';
import 'antd/dist/antd.css';


const { Header, Content, Footer, Sider } = Layout;

class Home extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  componentDidMount(){
    console.log('我打印啦',this.props)
    // console.log('加载了')
    // console.log(addNameCreater('ceshi'))
    // axios.get('http://192.168.6.19/blog_server/public/api/article/list', {
    //   params: {
    //     // ID: 12345
    //   }
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        {/* <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Sidebar/>
        </Sider> */}
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <Router /> 
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </Layout>
      </Layout>
    );

    {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
  }
};

export default Home;