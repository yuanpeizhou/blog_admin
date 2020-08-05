import React from "react";
import { Table,Form,Input } from 'antd';
import BreadcrumbComponent from '../../Breadcrumb/index'
import ActionButton from '../../ActionButton/index'

import {getWordList,wordUpdate} from '../../../api';


export default class WordList extends React.Component {
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
        current: 1,
        total: 0,
        onChange: (current) => this.changePage(current),
      },
      timeoutId: '',
    };

    this.columns = [
      {
        title: '线上图片',
        dataIndex: 'origin_url',
        width: 400,
        align:'center',
        render: text => <img src={text}></img>,
      },
      {
        title: '本地图片',
        dataIndex: 'local_url',
        width: 400,
        align:'center',
        render: text => <img src={text}></img>,
      },
      {
        title: '文本',
        dataIndex: 'word',
        width: 200,
        align: 'center',
        editable: true,
        // onChange={this.changeInput.bind(this,record)}
        render: (text,record) => <Form><Input  onPressEnter={this.changePress.bind(this,record)} defaultValue={text}></Input> </Form>,
      },
      {
        title: '操作',
        dataIndex: 'address',
        width: 600,
        align: 'center',
        // render: (text, record, index) => <ActionButton editClick={this.handleEdit} deleteClick={this.handleDelete} value={record}/>
      },
    ];

    this.loadData = this.loadData.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    // this.changePage = this.changePage(this)
  }
  componentDidMount(){
    this.loadData()
  }
  changePage(current){
    this.loadData(current,this.state.paginationProps.pageSize)
  }
  // changeInput(record,e){
  //   e.persist()

  //   clearTimeout(this.state.timeoutId)

  //   let timeoutId = setTimeout(() => {
  //     this.handleEdit(e.target.value,record.key)
  //   },1000);
  //   this.setState({
  //     timeoutId
  //   })
  // }
  changePress(record,e){
    console.log(record.key)
    console.log(e.target.value)
    this.handleEdit(e.target.value,record.key)
  }
  /*加载数据*/
  loadData(current = 1,pageSize = 10,isInit = true){
    const _this = this 
    getWordList('api/word/list','get',{page: current , limit : pageSize },function(res){

      const data = res.data.map((item , index) => {
        var temp = []
        temp['key'] = item.id
        temp['origin_url'] = item.origin_url
        temp['local_url'] = item.local_url
        temp['word'] = item.word
        return temp
      })

      /**更新分页信息 */
      const pageData = _this.state.paginationProps
      pageData.total = res.total
      pageData.current = res.current_page
      pageData.pageSize = res.per_page
      pageData.showTotal = () => `共`+ res.total +`条`

      if(isInit){
        _this.setState({
          tableData : data,
          paginationProps : pageData
        });
      }
    })
  }
  /*编辑数据*/
  handleEdit(word,id){
    const _this = this
    wordUpdate('api/word/update','post',{id: id ,word: word },function(res){
      _this.loadData(_this.state.paginationProps.current,_this.state.paginationProps.pageSize)
    })
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
          pagination={this.state.paginationProps}
          bordered
          // title={() => 'Header'}
          // footer={() => 'Footer'}
        />
      </>
    );
  }
};

