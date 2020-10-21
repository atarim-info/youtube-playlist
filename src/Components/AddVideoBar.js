import React, {Component} from 'react';
import {Input, Button, Form, notification} from 'antd';
import {SmileTwoTone, VideoCameraAddOutlined} from '@ant-design/icons';
import youtube from '../Libs/YouTubeLib';
import crud from '../Libs/CRUDApiLib';
import './AddVideoBar.css';

class AddVideoBar extends Component {

    state = {
        videoId: null
    };

    handleChange = (event) => {
        console.log(event.target.value);
        this.setState({
            videoId: event.target.value
        });
    };

    handleSearch = (video) => {
        this.setState({ selectedVideo: this.state.videos[video], search: false });
    }

    handleSubmit = async (values) => {
        const videoId = values.videoId;

        await youtube.get('/videos',{
                params: {
                    id: videoId,
                    maxResults: 1
                }
            }).then(
                response => {
                    this.setState({
                        videos: response.data.items
                    })
                    console.log(process.env.REACT_APP_BACKEND_URL);

                    crud.post('/videotrack', {
                        data: {
                            videoId: videoId
                        }
                    }).then((
                        response) => {
                            this.props.handleFormSubmit(this.state.video);
                        }
                    ).catch(
                        error => {
                        // handle error
                        console.log(error);
                    })
                }
            ).catch(error => {
                    // handle error
                    console.log(error);
                    notification.open({
                        message: 'Video $videoId not found',
                        description: 'Please try again',
                        icon: <SmileTwoTone twoToneColor="#108ee9"/>
                    })
                }
            );
    }

    render() {
        return (
            <Form onFinish={this.handleSubmit} className='ui-form'>
                <Form.Item
                    name="videoId"
                    rules={[{ required: true, message: 'Please input Video Id!' }]}
                >
                    <Input placeholder="Video Id" allowClear onChange={this.handleChange}/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary" icon={<VideoCameraAddOutlined />} />
                </Form.Item>
            </Form>
        );
    }
}

export default AddVideoBar;