import React, { Component } from 'react';
// import SearchBar from './SearchBar';
import VideoListItem from './VideoListItem';
import { List } from 'antd';

class VideoList extends Component {
    state = {
        data: []
    };

    render() {
        if( this.props.videos.length === 0 ) {
            return (
                <div style={{ "display": "flex", "flexDirection": "column"  }}>
                    <List
                        style={{ "width": "100%"}}
                        size={"large"}
                        header={<div>Video Suggestions</div>}
                        bordered
                        dataSource={ this.state.data }
                        renderItem={item => (<List.Item>{item}</List.Item>)}
                    />
                </div>
            )
        }

        const videoItems = this.props.videos.map((video, index) => {
            return (
                <VideoListItem
                    key={ index }
                    video={ video }
                    onUserSelected={ this.props.onVideoSelect.bind( this, [ index ]) }
                />
            )
        });

        return (
            <ul style={{ "listStyle":"none" ,"width":"40%", "padding": "5px", "border": "1px solid #efefef", "marginBottom": "3px", "borderRadius": "5px" }}>
                { videoItems }
            </ul>
        );
    }
}

export default VideoList;