import React, { Component } from 'react';
import { notification } from 'antd';
import { SmileTwoTone , SearchOutlined } from '@ant-design/icons';

import AddVideoBar from './Components/AddVideoBar'
import VideoList from './Components/VideoList';
import VideoDetail from './Components/VideoDetail';

import './App.css';
import crud from "./Libs/CRUDApiLib";

import dotenv from 'dotenv';
dotenv.config();

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
    this.loadData();
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
    if (played === 1) {
      //user selected
    }
  };

  loadData = () => {
    crud.get('/videotrack').then((
        response) => {
          console.log(response);
          // const videoIds = response.data.items;
          // console.log(videoIds);
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
