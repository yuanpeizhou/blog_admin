import React from 'react';


import { Menu, Switch } from 'antd';
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
      current: '1',
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
        defaultOpenKeys={['sub1']}
        selectedKeys={[this.state.current]}
        mode="inline"
      >
        <SubMenu key="sub1" icon={<MailOutlined />} title="文章管理">
          <Menu.Item key="1">文章列表</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="人员管理">
          <Menu.Item key="2">人员列表</Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" icon={<SettingOutlined />} title="设置">
          <Menu.Item key="3">角色管理</Menu.Item>
          <Menu.Item key="4">权限列表</Menu.Item>
        </SubMenu>
      </Menu>

    </>
  }
}
