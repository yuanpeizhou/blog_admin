import React from 'react';
import { Menu, Breadcrumb } from 'antd';

export default class BreadcrumbComponent extends React.Component {
  constructor(props) {
		super(props);
		
		console.log(props.path)
  }

  render() {
    return  <>
      <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb>
    </>
  }
}
