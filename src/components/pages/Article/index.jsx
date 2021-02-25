import React from "react";
import { Table } from 'antd';
import BreadcrumbComponent from '../../Breadcrumb/index'
import ActionButton from '../../ActionButton/index'




const data = [
  {
    key: '1',
    id: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  },
  // {
  //   key: '2',
  //   id: '2',
  //   name: 'Jim Green',
  //   money: '￥1,256,000.00',
  //   address: 'London No. 1 Lake Park',
  // },
  // {
  //   key: '3',
  //   id: '3',
  //   name: 'Joe Black',
  //   money: '￥120,000.00',
  //   address: 'Sidney No. 1 Lake Park',
  // },
];



export default class ArticleList extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: '文章标题',
        dataIndex: 'name',
        width: 200,
        align:'center',
      },
      {
        title: 'Cash Assets',
        className: 'column-money',
        dataIndex: 'money',
        align: 'center',
      },
      {
        title: 'Address',
        dataIndex: 'address',
      },
      {
        title: '操作',
        dataIndex: 'address',
        align: 'center',
        render: (text, record, index) => <ActionButton editClick={this.handleEdit} deleteClick={this.handleDelete} value={record}/>
      },
    ];
    
    this.loadData = this.loadData.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  /*加载数据*/
  loadData(){

  }
  /*编辑数据*/
  handleEdit(id){
    alert(id)
  }
  /*删除数据*/
  handleDelete(id){
    alert(id)
  }
  handleClick(){
    alert('hahah');
  }
  render() {
    return (
      <>
        <BreadcrumbComponent path='文章管理/文章列表'/>
        
        <Table
          columns={this.columns}
          dataSource={data}
          bordered
          // title={() => 'Header'}
          // footer={() => 'Footer'}
        />
      </>
    );
  }
};

