import React from 'react';
import { YoutubeOutlined } from '@ant-design/icons';
import ResponsivePlayer from './ResponsivePlayer';

const VideoDetail = ({video, handleWatchComplete }) => {
    // const state = {
    //     video: null
    // };
    //
    // const video = state.video;

    if ( !video.id ) {
        return (
            <div style={{ "width": "100%", "background": "#999999", "color": "#fff", "height": "85vh", "postion": "relative" }}>
                <h1 style={{ "top":"50%", "left": "50%", "position": "absolute" }}><YoutubeOutlined/></h1>
            </div>
        )
    }

    console.log(video.id);

    const videoId = video.id.videoId;
    const url = `https://www.youtube.com/embed/${ videoId }`;

    return (
        <div>
            <div>
                <ResponsivePlayer url={url} onProgress={handleWatchComplete}/>
            </div>
            <div>
                <h2>
                    { video.snippet.title }
                </h2>
                <div>
                    { video.snippet.description }
                </div>
            </div>
        </div>
    )
}

export default VideoDetail;