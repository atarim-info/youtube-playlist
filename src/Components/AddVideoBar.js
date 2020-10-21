import React, {Component} from 'react';
import {Input, Button, Form, notification} from 'antd';
import {SmileTwoTone, VideoCameraAddOutlined} from '@ant-design/icons';
import youtube from '../Libs/YouTubeLib';
import crud from '../Libs/CRUDApiLib';
import './AddVideoBar.css';

class AddVideoBar extends Component {

    state = {
        video: null,
        videoId: null,
    };

    componentDidUpdate(prevProps) {
        if( this.props.video && ( prevProps.video !== this.props.video)  ) {
            this.setState({ video: this.props.video })
        }
    }

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
                    const video = response.data.items[0];
                    this.setState({
                        video: video
                    })

                    notification.open({
                        message: 'Video ' + videoId + ' found on YouTube',
                        description: video.snippet.title,
                        icon: <SmileTwoTone twoToneColor="#108ee9"/>
                    })
                    //console.log(process.env.REACT_APP_BACKEND_URL);
                    this.props.handleFormSubmit(video);
                    this.add2DB(videoId);

                }
            ).catch(error => {
                    // handle error YouTube fetch error
                    console.log(error);
                    notification.open({
                        message: 'Video ' + videoId + ' not found on YouTube',
                        description: 'Please try again',
                        icon: <SmileTwoTone  rotate={180} twoToneColor="#eb2f96"/>
                    })
                }
            );

    }

    add2DB(videoId) {
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