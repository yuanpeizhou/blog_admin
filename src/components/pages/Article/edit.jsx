import React from "react";
import { Form, Input, Button, Checkbox, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import editor from "wangeditor"



export default class ArticleEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: null,
      loading: null
    }

    this.onFinish = this.onFinish.bind(this)
    this.onFinishFailed = this.onFinishFailed.bind(this)
    this.beforeUpload = this.beforeUpload.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getBase64 = this.getBase64.bind(this)
  }

  componentDidMount() {
    const editorER = new editor("#box")
    editorER.create()
  }


  onFinish = (values) => {
    console.log('Success:', values);
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  handleChange(info) {
    if (info.file.status === 'uploading') {
      this.loading = true;
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => {
        this.imageUrl = imageUrl;
        this.loading = false;
      });
    }
  }
  render() {
    return (
      <div className="form_box">
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 8 }}
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          autoComplete="off"
          className="article_form"
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="封面"
            name="cover"
          // rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}
            >
              {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>}
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 0, span: 16 }}
            label="内容"
            name="content"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <div id="box"></div>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
};