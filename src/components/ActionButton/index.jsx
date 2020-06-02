import React from "react";
import { Button } from 'antd';

/**
 *  @params editClick function 编辑回调
 *  @params deleteClick function 删除回调
 */
export default class ActionButton extends React.Component {
  constructor(props) {
		super(props);
    console.log(props.value)
    this.state = {
      editClick: props.editClick,
      deleteClick: props.deleteClick,
      id: props.value.id
    }
    this.editHandleClick = this.editHandleClick.bind(this);
    this.deleteHandleClick = this.deleteHandleClick.bind(this);
  }
  editHandleClick(){
    this.state.editClick(this.state.id)
  }
  deleteHandleClick(){
    this.state.deleteClick(this.state.id)
  }
  render() {
    return (
      <>
        <Button className='edit_button' onClick={this.editHandleClick} type="primary">编辑</Button>
        <Button className='delete_button' type="primary" onClick={this.deleteHandleClick} danger>删除</Button>
      </>
    );
  }
};