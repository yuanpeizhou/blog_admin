import React from "react";
import { Pagination,Search } from 'antd';
import {getImgsList} from '../../../api';


export default class ImgsList extends React.Component {
  constructor(props) {

    super(props);
    const img_id = localStorage.getItem('img_page')

    

    this.state = {
      list: [],
      current: img_id ? img_id : 1,
      pageSize : 10,
      total : 1 
    };

    // console.log(this.state.current)
    this.loadData = this.loadData.bind(this);
    this.changePage = this.changePage.bind(this)
    // this.goInfo = this.goInfo.bind(this)
  }
  componentDidMount(){
    this.loadData(this.state.current ? this.state.current : 1)
  }
  changePage(current){
    this.loadData(current,this.state.pageSize)
  }
  goInfo(id){
    localStorage.setItem('img_page',this.state.current)
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
        temp['img_list'] = item.img_list
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
          return <div key={index}>
            <h1 onClick={this.goInfo.bind(this,item.key)} style={{ margin: '10px 0' }}>{item.name}({item.number})</h1>
            {
              item
            }
          </div>
        })}
        <Pagination current={this.state.current} total={this.state.total} onChange={(current) => this.changePage(current)}/>
    </div>
  }
};