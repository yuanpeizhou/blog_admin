import React from "react";
import { Pagination } from 'antd';
import {getImgsList} from '../../../api';


export default class ImgsList extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      list: [],
      current: 1,
      pageSize : 10,
      total : 1 
    };


    this.loadData = this.loadData.bind(this);
    this.changePage = this.changePage.bind(this)
    // this.goInfo = this.goInfo.bind(this)
  }
  componentDidMount(){
    this.loadData()
  }
  changePage(current){
    this.loadData(current,this.state.pageSize)
  }
  goInfo(id){
    this.props.history.push({pathname:'/imgs/info' + '/' + id ,query:{id: id}})
  }
  /*加载数据*/
  loadData(current = 1,pageSize = 10,isInit = true){
    const _this = this 
    getImgsList('api/imgs/list','get',{page: current , limit : pageSize },function(res){
      const data = res.data.map((item , index) => {
        var temp = []
        temp['key'] = item.id
        temp['name'] = item.name
        temp['number'] = item.number
        return temp
      })

      _this.setState({
        list : data,
        current : res.current_page,
        pageSize : res.per_page,
        total: res.total
      });
    })
  }
  render() {
    return  <div style={{ margin: '16px 0' }}>
        {this.state.list.map((item,index) => {
          return <div>
            <h1 key={index} onClick={this.goInfo.bind(this,item.key)} style={{ margin: '10px 0' }}>{item.name}({item.number})</h1>
          </div>
        })}
        <Pagination defaultCurrent={this.state.current_page} total={this.state.total} onChange={(current) => this.changePage(current)}/>
    </div>
  }
};