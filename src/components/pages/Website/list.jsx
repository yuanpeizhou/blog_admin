import React from "react";
import { Table } from 'antd';
import {getWebsiteList} from '../../../api';
import ActionButton from '../../ActionButton/index'


export default class WebsiteList extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      tableData: [],
      paginationProps: {
        position: ['none', 'bottomRight'],
        showSizeChanger: false,
        showQuickJumper: false,
        showTotal: () => `共0条`,
        pageSize: 10,
        current: this.props.match.params.page ? this.props.match.params.page : 1,
        total: 0,
        onChange: (current) => this.changePage(current),
      },
    };
    this.columns = [
        {
          title: '排序',
          dataIndex: 'index',
          width: 30,
          align:'center',
        },
        {
          title: '网站名',
          dataIndex: 'name',
          width: 120,
          align:'center',
        },
        {
          title: '网址',
          dataIndex: 'url',
          width: 200,
          align:'center',
        },
        {
          title: '创建时间',
          dataIndex: 'created_at',
          width: 150,
          align:'center',
        },
        {
          title: '编辑时间',
          dataIndex: 'updated_at',
          width: 150,
          align:'center',
        },
        {
          title: '操作',
          dataIndex: 'address',
          width: 400,
          align: 'center',
          render: (text, record, index) => <ActionButton editClick={this.handleEdit.bind(this)} value={record}/>
        },
      ];

    console.log(this.state.current)
    this.loadData = this.loadData.bind(this);
    this.changePage = this.changePage.bind(this)
    this.handleEdit = this.handleEdit.bind(this);
  }
  componentDidMount(){
    this.loadData(this.state.current ? this.state.current : 1)
  }
  changePage(current){
    const pageData = this.state.paginationProps

    pageData.current = current

    this.props.history.push({pathname:'/website/list/' + current ,query:{page: current}})

    this.setState({
      paginationProps : pageData
    },function(){
      this.loadData()
    })
  }
  /*加载数据*/
  loadData(current = 1,pageSize = 10,isInit = true){
    const _this = this 
    getWebsiteList('admin/website/list','get',{page: current , limit : pageSize },function(res){
      console.log(res)
      const data = res.data.map((item , index) => {
        var temp = []
        temp['index'] = item.index
        temp['key'] = item.id
        temp['name'] = item.website
        temp['url'] = item.url
        temp['created_at'] = item.created_at
        temp['updated_at'] = item.updated_at
        return temp
      })

      _this.setState({
        tableData : data,
        current : res.current_page,
        pageSize : res.per_page,
        total: res.total
      });
    })
  }
  handleEdit(record,e){
    console.log(record)
  }
  render() {
    return(
        <div>
            <Table
            columns={this.columns}
            dataSource={this.state.tableData}
            pagination={this.state.paginationProps}
            bordered
            // title={() => 'Header'}
            // footer={() => 'Footer'}
            />
        </div>
    )
  }
};