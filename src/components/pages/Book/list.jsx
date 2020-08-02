import React from "react";
import { Table } from 'antd';
import BreadcrumbComponent from '../../Breadcrumb/index'
import ActionButton from '../../ActionButton/index'

import getArticleList from '../../../api';


export default class BookList extends React.Component {
  constructor(props) {

    super(props);

    this.state = {tableData: []};

    this.columns = [
      {
        title: '书名',
        dataIndex: 'book_name',
        width: 400,
        align:'center',
        render: text => <a>{text}</a>,
      },
      {
        title: '作者',
        dataIndex: 'author_name',
        width: 300,
        align:'center',
      },
      {
        title: '链接',
        // className: 'column-money',
        dataIndex: 'url',
        align: 'center',
      },
      // {
      //   title: 'Address',
      //   dataIndex: 'address',
      // },
      {
        title: '操作',
        dataIndex: 'address',
        width: 200,
        align: 'center',
        render: (text, record, index) => <ActionButton editClick={this.handleEdit} deleteClick={this.handleDelete} value={record}/>
      },
    ];
    console.log('初始化')
    this.loadData = this.loadData.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount(){
    console.log('加载了')
    this.loadData()
  }
  /*加载数据*/
  loadData(){
    const _this = this 
    getArticleList('api/book/list','get',null,function(res){
        // console.log('返回',res)
        const data = res.data.map((item , index) => {
          var temp = []
          temp['key'] = item.id
          temp['book_name'] = item.book_name
          temp['author_name'] = item.author_name
          temp['url'] = item.url
          return temp
        })
        _this.setState({
          tableData : data
        });
    })
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
        <BreadcrumbComponent path='书籍管理/书籍列表'/>
        
        <Table
          columns={this.columns}
          dataSource={this.state.tableData}
          bordered
          // title={() => 'Header'}
          // footer={() => 'Footer'}
        />
      </>
    );
  }
};

