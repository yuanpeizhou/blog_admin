import React from "react";
import { Table, Input , Row , Button ,Form} from 'antd';
import BreadcrumbComponent from '../../Breadcrumb/index'
import ActionButton from '../../ActionButton/index'

import {handleBook,getBookList,getSpiderCommond} from '../../../api';
import { withRouter } from "react-router";


class BookList extends React.Component {
  formRef = React.createRef();

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
      searchData: {
        book_name : '测试',
        author_name : ''
      },
      searchLocalStorageKey: 'book_list_search_data',
    };

    this.columns = [
      {
        title: 'id',
        dataIndex: 'key',
        width: 30,
        align:'center',
      },
      {
        title: '书名',
        dataIndex: 'book_name',
        width: 250,
        align:'center',
        render: (text,record) => <a target="_blank" rel="noopener noreferrer" href={'/book/info/' + record.key}>{text}</a>,
      },
      {
        title: '作者',
        dataIndex: 'author_name',
        width: 150,
        align:'center',
      },
      {
        title: '章节总数量',
        dataIndex: 'chapter_num',
        width: 110,
        align:'center',
      },
      {
        title: '爬取章节数',
        dataIndex: 'current_page',
        width: 110,
        align:'center',
      },
      {
        title: '上次更新日期',
        dataIndex: 'last_update_date',
        width: 130,
        align:'center',
      },
      {
        title: '上次扫描日期',
        dataIndex: 'last_scan_date',
        width: 130,
        align:'center',
      },
      {
        title: '字数',
        dataIndex: 'words',
        width: 50,
        align:'center',
      },
      {
        title: '链接',
        dataIndex: 'url',
        align: 'center',
      render: text => <a target="_blank" rel="noopener noreferrer" href={text}>{text}</a>,
      },
      {
        title: '操作',
        dataIndex: 'address',
        width: 400,
        align: 'center',
        render: (text, record, index) => 
        <>
          <ActionButton 
            infoClick={this.handleInfo.bind(this)} 
            handleClick={this.handleBook.bind(this,record)}
            exportClick={this.handleExport.bind(this,record)}  
            getSpiderClick={this.getSpiderClick.bind(this.record)}
            value={record}
          />
        </>
      },
    ];

    this.loadData = this.loadData.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    // this.changeInput = this.changeInput.bind(this)
    // this.searchSubmit = this.searchSubmit(this)
  }
  componentDidMount(){
    const search = localStorage.getItem(this.state.searchLocalStorageKey)
    

    if(search){
      const searchData = JSON.parse(search)
      this.setState({
        searchData: searchData
      },function(){
        this.formRef.current.setFieldsValue({
          book_name: searchData.book_name,
          author_name: searchData.author_name
        })
        this.loadData()   
      })
    }else{
      this.loadData()  
    }
  }
  /**翻页 */
  changePage(current){
    const pageData = this.state.paginationProps

    pageData.current = current

    this.props.history.push({pathname:'/book/list/' + current ,query:{page: current}})

    this.setState({
      paginationProps : pageData
    },function(){
      this.loadData()
    })
  }
  /**提交搜索 */
  searchSubmit(){
    const pageData = this.state.paginationProps

    pageData.current = 1

    localStorage.setItem(this.state.searchLocalStorageKey,JSON.stringify(this.state.searchData))

    this.setState({
      paginationProps : pageData
    },function(){
      this.loadData()
    })
  }
  /**重置搜索 */
  searchReset(){
    this.formRef.current.resetFields();

    const pageData = this.state.paginationProps

    pageData.current = 1

    const searchData = this.state.searchData

    searchData.book_name = ''
    searchData.author_name = ''

    this.setState({
      paginationProps : pageData,
      searchData: searchData
    },function(){
      this.loadData()
    })
  }
  /*加载数据*/
  loadData(isInit = true){
    const _this = this 

    const params = {
      page : _this.state.paginationProps.current,
      limit : _this.state.paginationProps.pageSize,
      book_name : _this.state.searchData.book_name,
      author_name : _this.state.searchData.author_name
    }

    getBookList(params,function(res){
        // console.log('返回',res)
        const data = res.data.map((item , index) => {
          var temp = []
          temp['key'] = item.id
          temp['book_name'] = item.book_name
          temp['author_name'] = item.author_name
          temp['chapter_num'] = item.chapter_num
          temp['current_page'] = item.current_page
          temp['last_update_date'] = item.last_update_date
          temp['last_scan_date'] = item.last_scan_date
          temp['words'] = item.words
          temp['url'] = item.url
          return temp
        })

        /**更新分页信息 */
        const pageData = _this.state.paginationProps
        pageData.total = res.total
        pageData.current = res.current_page
        pageData.pageSize = res.per_page
        pageData.showTotal = () => `共`+ res.total +`条`

        _this.setState({
          tableData : data,
          paginationProps : pageData
        });
    })
  }
  handleBook(record,e){
    const params = {
      id : record.key
    }

    const _this = this
    handleBook('api/book/handleBook','post',params,function(res){
      _this.loadData()
    })
  }
  handleExport(record,e){
    window.location.href="http://127.0.0.1/book_spider/public/api/book/export?id=" + record.key
  }
  getSpiderClick(id){
    const params = {
      id : id
    }
    console.log(params)
    getSpiderCommond(params,function(res){
      console.log(res)
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
  handleInfo(id){
    this.props.history.push({pathname:'/book/info/' + id ,query:{id: id}})
  }
  handleClick(){
    alert('hahah');
  }
  changeInput(e){
    const field = e.target
    const searchData = this.state.searchData
    searchData[field.name] = field.value
    this.setState({
      searchData 
    })
  }
  /**弹出层隐藏 */
  hide = () => {
    this.setState({
      visible: false,
    });
  };
  /**弹出层变化 */
  handleVisibleChange = visible => {
    this.setState({ visible });
  };
  render() {
    return (
      <>
        <BreadcrumbComponent path='书籍管理/书籍列表'/>
        <div className="search" style={{ margin: '16px 15px' }}>
          <Form ref={this.formRef} name="search" layout="inline" >
            <Row>
                <Form.Item name="book_name" label="书名">                  
                  <Input placeholder="请输入书名" name="book_name" value={this.state.searchData.book_name} onChange={this.changeInput.bind(this)}/>
                </Form.Item>
                <Form.Item name="author_name" label="作者">
                  <Input placeholder="请输入作者名" name="author_name" value={this.state.searchData.author_name} onChange={this.changeInput.bind(this)}/>
                </Form.Item>
                <Form.Item> 
                  <Button type="primary" onClick={this.searchSubmit.bind(this)}>
                    搜索
                  </Button>
                </Form.Item>
                <Form.Item> 
                  <Button type="primary" onClick={this.searchReset.bind(this)}>
                    重置
                  </Button>
                </Form.Item>
            </Row>
          </Form>
        </div>
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

export default withRouter(BookList);



