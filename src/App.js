import React, { Component } from 'react';
import { notification } from 'antd';
import { SmileTwoTone , SearchOutlined } from '@ant-design/icons';

import YTSearch from 'youtube-api-search';

import AddVideoBar from './Components/AddVideoBar'
import VideoList from './Components/VideoList';
import VideoDetail from './Components/VideoDetail';
import YouTubeLib from "./Libs/YouTubeLib";

import './App.css';
import dotenv from 'dotenv';

dotenv.config();
const API_KEY = process.env.REACT_APP_API_KEY;

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
  }

  welcome = () => {
    notification.open({
      message: 'Hey nice to see you here',
      description: 'Let us start by searching for some videos',
      icon: <SmileTwoTone twoToneColor="#108ee9"/>
    })
  };

  videoSearch( term ) {
    if ( this.state.search ) {
      YTSearch({ key: API_KEY, term }, (data) => {
        try {
          if( data && data.data && data.data.error.message ) {
            console.log(data);
            // eslint-disable-next-line
            throw ('error')
          }
          this.setState({ videos: data, selectedVideo: data[0] });
          console.log( this.state.videos );
        } catch( err ) {
          notification['error']({
            message: "Daily Limit Exceeded",
            description: "Youtube data API daily limit have exceeded. Quota will be recharged at 1:30pm IST. Wait till then.",
          })
        }
      });
    }
  }

  populateVideoDetails (videoIds) {

  }

  handleChange = (value) => {
    setTimeout( () => {
      if( value === ''){
        this.setState({ videos: [], selectedVideo: null });
        return;
      }

      if( this.state.search ) {
        this.videoSearch( value );
      }

      setTimeout( () => {
        this.setState({ search: true });
      }, 5000);
    }, 2000);
  };

  handleWatchComplete = ({played}) => {
    console.log(played);
    if (played === 1) {
      //user selected
    }
  };

  handleSubmit = async (videoId) => {

  };

  render() {
    return (
        <div style={{ "display": "flex", "flexDirection": "column"  }}>
          <div style={{ "display": "flex", "justifyContent": "space-between", "background": "#123456"}}>
            <h1 style={{ "color": "#fff", "alignSelf": "center", "flexBasis": "4", "paddingTop": "20px", "paddingLeft": "30px" }}>YTSearch <SearchOutlined/></h1>
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
