import React from "react";
import { Table } from 'antd';
import BreadcrumbComponent from '../../Breadcrumb/index'
import ActionButton from '../../ActionButton/index'

import { getArticleList } from '../../../api';
export default class ArticleList extends React.Component {
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
        // onChange: (current) => this.changePage(current),
      },
      // searchData: {
      //   book_name: '测试',
      //   author_name: ''
      // },
      // searchLocalStorageKey: 'book_list_search_data',
    };

    this.columns = [
      {
        title: '文章标题',
        dataIndex: 'title',
        width: 200,
        align: 'center',
      },
      {
        title: '封面',
        dataIndex: 'cover',
        align: 'center',
        // < a target = "_blank" rel = "noopener noreferrer" href = { '/book/info/' + record.key } > { text }</a >
        render: (text, record) => <img style={{ height: '80px' }} src={record.cover} />,
      },
      {
        title: '详情',
        dataIndex: 'content',
      },
      {
        title: '操作',
        dataIndex: 'address',
        align: 'center',
        render: (text, record, index) => <ActionButton editClick={this.handleEdit} deleteClick={this.handleDelete} value={record} />
      },
    ];

    this.loadData = this.loadData.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    this.loadData()
  }
  /*加载数据*/
  loadData(isInit = true) {

    const _this = this

    const params = {
      page: 1,
      limit: 10
    }

    getArticleList(params, function (res) {
      const data = res.data.map((item, index) => {
        var temp = []
        temp['key'] = item.id
        temp['title'] = item.title
        temp['cover'] = item.cover
        temp['content'] = item.content
        temp['created_at'] = item.created_at
        temp['current_page'] = item.current_page
        return temp
      })

      /**更新分页信息 */
      const pageData = _this.state.paginationProps
      pageData.total = res.total
      pageData.current = res.current_page
      pageData.pageSize = res.per_page
      pageData.showTotal = () => `共` + res.total + `条`

      _this.setState({
        tableData: data,
        paginationProps: pageData
      });
    })
  }
  /*编辑数据*/
  handleEdit(id) {
    alert(id)
  }
  /*删除数据*/
  handleDelete(id) {
    alert(id)
  }
  handleClick() {
    alert('hahah');
  }
  render() {
    return (
      <>
        <BreadcrumbComponent path='文章管理/文章列表' />

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

