import React from "react";
import { Input , Row  , Button ,Form , Card,Modal} from 'antd';
import BreadcrumbComponent from '../../Breadcrumb/index'
import ActionButton from '../../ActionButton/index'

import {getArticleList,handleBook,getVideoList} from '../../../api';

import { withRouter } from "react-router";
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import SWF_URL from 'videojs-swf/dist/video-js.swf'
videojs.options.flash.swf = SWF_URL // 设置flash路径，Video.js会在不支持html5的浏览中使用flash播放视频文件

const { Meta } = Card;


class BookList extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      videoList: [],
      pageList: [],
      rtmp: '',
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
        book_name : '',
        author_name : ''
      },
      visible: false
    };


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
    getVideoList(null,function(res){
      // console.log(res)
      if(res){
        const temp = JSON.parse(res)
        _this.setState({
          videoList : temp.data,
          pageList: temp.data.slice(0,_this.state.paginationProps.pageSize)
        });
      }
      console.log(_this.state.pageList)
    });

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
  /*编辑数据*/
  handleEdit(id){
    alert(id)
  }
  /*删除数据*/
  handleDelete(id){
    alert(id)
  }
  handleInfo(id){
    this.props.history.push({pathname:'/book/info' + '/' + id ,query:{id: id}})
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
  videoClick(video){
    this.setState({
      // visible: true,
      rtmp: video
    });
    this.loadPlayer(video)
    // setTimeout(
    //   this.loadPlayer(video)
    // ,1000)

  }
  showModal = () => {

  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  loadPlayer(video){
    const videoPlayer = videojs('my-player');// 关联video标签的id
    videoPlayer.src({
      src: video,
      type: 'rtmp/flv'
    });
    videoPlayer.play();
  }
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
        {
          <div className="videolist">
            {
              this.state.pageList.length > 0 && this.state.pageList.map((item,index) => {
                return <Card
                  key={index}
                  hoverable
                  style={{margin: 15 , width: 260 }}
                  // src={item.cover}
                  cover={<img alt="example"  />}
                  // style={{ width: 260}}
                  onClick={this.videoClick.bind(this,item.video)}
                >
                  <Meta title={item.name}  />
                </Card>
              })
            }
          </div>
        }
        <Modal
          title="播放"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        </Modal>
        <video id="my-player"
            className="video-js vjs-default-skin vjs-big-play-centered"
              preload="auto"
              autoplay
              style={{width: 450,height: 300}}
              controls
              data-setup=''>
            <source src={this.state.rtmp} type="rtmp/flv"/>
          </video>
      </>
    );
  }
};

export default withRouter(BookList);

//description="www.instagram.com"

