import React from 'react';


import { Menu } from 'antd';
import { Link } from "react-router-dom";
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
// import {
//   AppstoreOutlined,
//   BarChartOutlined,
//   CloudOutlined,
//   ShopOutlined,
//   TeamOutlined,
//   UserOutlined,
//   UploadOutlined,
//   VideoCameraOutlined,
// } from '@ant-design/icons';

const { SubMenu } = Menu;
// import 'antd/dist/antd.css';


export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: 'dark',
      current: 'wordList1',
    };

  }

  changeTheme = value => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });

  };


  render() {
    return  <>
      {/* <Switch
        checked={this.state.theme === 'dark'}
        onChange={this.changeTheme}
        checkedChildren="暗色主题"
        unCheckedChildren="亮色主题"
      /> */}

      <Menu
        theme={this.state.theme}
        onClick={this.handleClick}
        // style={{ width: 256 }}
        defaultOpenKeys={['wordList']}
        selectedKeys={[this.state.current]}
        mode="inline"
      >
        {/* <Router><Link to="/article/list">文章列表</Link></Router> */}
        <SubMenu key="website" icon={<MailOutlined />} title="网站管理">
          <Menu.Item key="websiteList"><Link to="/website/list/1">网站列表</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub1" icon={<MailOutlined />} title="文章管理">
          <Menu.Item key="1"><Link to="/article/list">文章列表</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="人员管理">
          <Menu.Item key="2"><Link to="/welcome">人员列表</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="bookList" icon={<AppstoreOutlined />} title="书籍管理">
          <Menu.Item key="bookList1"><Link to="/book/list/1">书籍列表</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="wordList" icon={<AppstoreOutlined />} title="字典管理">
          <Menu.Item key="wordList1"><Link to="/word/list">字典列表</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="videoList" icon={<AppstoreOutlined />} title="直播管理">
          <Menu.Item key="videoList1"><Link to="/video/list">直播列表</Link></Menu.Item>
        </SubMenu>
        {/* <SubMenu key="sub4" icon={<SettingOutlined />} title="设置">
          <Menu.Item key="3">角色管理</Menu.Item>
          <Menu.Item key="4">权限列表</Menu.Item>
        </SubMenu> */}
      </Menu>

    </>
  }
}
