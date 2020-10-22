import React, { Component } from 'react';
import { notification } from 'antd';
import { SmileTwoTone , SearchOutlined } from '@ant-design/icons';

import AddVideoBar from './Components/AddVideoBar'
import VideoList from './Components/VideoList';
import VideoDetail from './Components/VideoDetail';

import './App.css';
import crud from "./Libs/CRUDApiLib";

import dotenv from 'dotenv';
import youtube from "./Libs/YouTubeLib";
dotenv.config();

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

class App extends Component {

  constructor( props ) {
    super(props);
    this.state = {
      videos: [],
      search: true,
      selectedVideo: {}
    };
  }

  async componentDidMount() {
    this.welcome();
    await this.loadData();
  }

  welcome = () => {
    notification.open({
      message: 'Hey nice to see you here',
      description: 'Let us start by searching for some videos',
      icon: <SmileTwoTone twoToneColor="#108ee9"/>
    })
  };

  handleWatchComplete = ({played}) => {
    console.log(played);
    if (played == 1) {
        let videos = this.state.videos;
        let nextVideoIndex = 0;
        videos.forEach((video, index) => {
            if (video == this.state.selectedVideo) {
                if (index < videos.size && nextVideoIndex == 0) {
                    nextVideoIndex = index + 1;
                }
            }
        })
        this.setState({
            selectedVideo: this.state.videos[nextVideoIndex]
        })//next selected
    }
  };

  loadData2 = async () => {
    fetch(BACKEND_URL + '/videotrack', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
        .then((res) => res.json())
        .then((body) => {
          const videoIds = "";
          body.forEach((videotrack, index) => {
            console.log(videotrack);
            if (index > 0) {
              videoIds.concat(",")
            }
            videoIds.concat(videotrack.videoId);
          })
          console.log(videoIds);
        })
  }

  loadData = async () => {
    crud.get('/videotrack').then((
        response) => {
          console.log(response);
          const data = response.data;
          let videoIds = "";
          data.forEach((videotrack, index) => {
            console.log(videotrack);
            if (index > 0) {
              videoIds = videoIds.concat(",")
            }
            videoIds = videoIds.concat(videotrack.videoId);
          })
          console.log(videoIds);
          youtube.get('/videos',{
            params: {
              id: videoIds
            }
          }).then(
              response => {
                const videos = response.data.items;
                this.setState({
                  selectedVideo: videos[0],
                  videos: videos
                })
                //this.props.handleFormSubmit(video);
              }
          ).catch(error => {
                // handle error YouTube fetch error
                console.log(error);
              }
          );
        }
    ).catch(
        error => {
          // handle error
          console.log(error);
        })
  }

  handleSubmit = (video) => {
    console.log(video);
    this.setState({
      selectedVideo: video,
      videos: [...this.state.videos, video]
    })
  }

  render() {
    return (
        <div style={{ "display": "flex", "flexDirection": "column"  }}>
          <div style={{ "display": "flex", "justifyContent": "space-between", "background": "#123456"}}>
            <h1 style={{ "color": "#fff", "alignSelf": "center", "flexBasis": "4", "paddingTop": "20px", "paddingLeft": "30px" }}>Playlist Manager<SearchOutlined/></h1>
          </div>
          <div style={{ "display" : "flex" }}>
            <div style={{"display" : "block"}}>
              <AddVideoBar video={ this.state.selectedVideo } handleFormSubmit={this.handleSubmit}/>
              <VideoList
                  videos={ this.state.videos }
                  onVideoSelect={ ( userSelected ) => { this.setState({ selectedVideo: this.state.videos[ userSelected ] }) }}
              />
            </div>
            <VideoDetail video={ this.state.selectedVideo } handleWatchComplete={this.handleWatchComplete}/>
          </div>
        </div>
    );
  }
}
export default App;
