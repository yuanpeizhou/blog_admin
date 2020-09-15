import React from "react";
import { Button } from 'antd';

/**
 *  @params editClick function 编辑回调
 *  @params deleteClick function 删除回调
 */
export default class ActionButton extends React.Component {
  constructor(props) {
		super(props);
    // console.log(props.value)
    this.state = {
      editClick: props.editClick,
      deleteClick: props.deleteClick,
      infoClick: props.infoClick,
      scanClick: props.scanClick,
      handleClick: props.handleClick,
      exportClick: props.exportClick,
      spiderClick: props.spiderClick,
      id: props.value.key
    }
    this.editHandleClick = this.editHandleClick.bind(this);
    this.deleteHandleClick = this.deleteHandleClick.bind(this);
    this.infoClick = this.infoClick.bind(this)
    this.scanClick = this.scanClick.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.exportClick = this.exportClick.bind(this)
    this.spiderClick = this.spiderClick.bind(this)
  }
  editHandleClick(){
    this.state.editClick(this.state.id)
  }
  deleteHandleClick(){
    this.state.deleteClick(this.state.id)
  }
  infoClick(){
    this.state.infoClick(this.state.id)
  }
  scanClick(){
    this.state.scanClick(this.state.id)
  }
  handleClick(){
    this.state.handleClick(this.state.id)
  }
  exportClick(){
    this.state.exportClick(this.state.id)
  }
  spiderClick(){
    this.state.spiderClick(this.state.id)
  }
  render() {
    return (
      <>
      {
        this.state.scanClick && <Button className='scan_button' type="primary" onClick={this.scanClick} size="small">扫描</Button>
      }  
      {
        this.state.handleClick && <Button className='handle_button' type="primary" onClick={this.handleClick} size="small">转化</Button>
      }  
      {
        this.state.spiderClick && <Button className='spider_button' type="primary" onClick={this.spiderClick} size="small">爬取</Button>
      }
      {
        this.state.exportClick && <Button className='export_button' type="primary" onClick={this.exportClick} size="small">导出</Button>
      }  
      {
        this.state.infoClick && <Button className='info_button' type="primary" onClick={this.infoClick} size="small">详情</Button>
      } 
      {
        this.state.editClick && <Button className='edit_button' type="primary" onClick={this.editHandleClick} size="small">编辑</Button>
      }
      {
        this.state.deleteClick && <Button className='delete_button' type="primary" onClick={this.deleteClick} danger size="small">删除</Button>
      }
      </>
    );
  }
};