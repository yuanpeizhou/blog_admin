import React from "react";
import { Table, Input , Row , Button ,Form} from 'antd';
import BreadcrumbComponent from '../../Breadcrumb/index'
import ActionButton from '../../ActionButton/index'

import {getArticleList,handleChapter} from '../../../api';

export default class BookInfo extends React.Component {
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
        current: 1,
        total: 0,
        onChange: (current) => this.changePage(current),
      },
      searchData: {
        keyword : '',
      },
      tableDispLay : true,
      txt_content : ''
    };

    this.columns = [
      {
        title: '序号',
        dataIndex: 'key',
        width: 50,
        align:'center',
      },
      {
        title: '过滤文本',
        dataIndex: 'content',
        width: 500,
        align:'center',
        render: text => <p style={{cursor: 'pointer'}} onClick={this.contentClick.bind(this,text)} >{text ? text.slice(1,300) : ''}</p>,
      },
      {
        title: '原数据',
        dataIndex: 'source_content',
        width: 500,
        align: 'center',
        render: text => <p style={{cursor: 'pointer'}} onClick={this.sourceContentClick.bind(this,text)} >{text ? text.slice(1,300) : ''}</p>,
      },
      {
        title: '操作',
        dataIndex: 'address',
        width: 200,
        align: 'center',
        render: (text, record, index) => <ActionButton handleClick={this.handleChapter.bind(this,record)} editClick={this.handleEdit} deleteClick={this.handleDelete} value={record}/>
      },
    ];

    this.loadData = this.loadData.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    // this.searchSubmit = this.searchSubmit(this)
  }
  componentDidMount(){
    this.loadData()
  }
  /**翻页 */
  changePage(current){
    const pageData = this.state.paginationProps

    pageData.current = current

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
      id : _this.props.match.params.id,
      page : _this.state.paginationProps.current,
      limit : _this.state.paginationProps.pageSize,
      keyword : _this.state.searchData.keyword,
    }

    getArticleList('api/book/info','get',params,function(res){
        // console.log('返回',res)
        const data = res.data.map((item , index) => {
          var temp = []
          temp['key'] = item.id
          temp['content'] = item.content
          temp['source_content'] =  item.source_content
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
  /**处理章节名称 */
  handleChapter(record,e){
    const params = {
      id : record.key
    }

    const _this = this
    handleChapter('api/book/handleChapter','post',params,function(res){
      _this.loadData()
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
  changeInput(e){
    const field = e.target
    const searchData = this.state.searchData
    searchData[field.name] = field.value
    this.setState({
      searchData 
    })
  }
  sourceContentClick(text,e){
    this.setState({
      tableDispLay : false,
      txt_content : text
    })
  }
  contentClick(text,e){
    this.setState({
      tableDispLay : false,
      txt_content : text
    })
  }
  toTableButtonClick(){
    this.setState({
      tableDispLay : true,
    })
  }
  render() {
    return (
      <>
        <BreadcrumbComponent path='书籍管理/书籍详情'/>
        {/* <div className="search" style={{ margin: '16px 15px' }}>
          <Form ref={this.formRef} name="search" layout="inline" >
            <Row>
                <Form.Item name="keyword" label="关键词搜索">
                  <Input placeholder="请输入作关键词" name="keyword" value={this.state.searchData.keyword} onChange={this.changeInput.bind(this)}/>
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
        </div> */}
        {
          this.state.tableDispLay && 
          <Table
            columns={this.columns}
            dataSource={this.state.tableData}
            pagination={this.state.paginationProps}
            bordered
          // title={() => 'Header'}
          // footer={() => 'Footer'}
          />
        }
        {
          !this.state.tableDispLay && 
          <div>
            <Button className="chapter_content_return" type="primary" onClick={this.toTableButtonClick.bind(this)}>返回列表</Button>
            <pre>
              <div dangerouslySetInnerHTML={{__html:this.state.txt_content}}></div>
            </pre>
          </div>
        }
      </>
    );
  }
};

