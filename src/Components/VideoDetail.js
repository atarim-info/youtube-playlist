import React, {Component} from 'react';
import { YoutubeOutlined } from '@ant-design/icons';
import ResponsivePlayer from './ResponsivePlayer';

class VideoDetail extends Component {
    state = {
        video: null
    };

    componentDidUpdate(prevProps) {
        if( this.props.video && ( prevProps.video !== this.props.video)  ) {
            this.setState({ video: this.props.video })
        }
    }

    render() {
        // if (!video.id) {
        //     return (
        //         <div style={{
        //             "width": "100%",
        //             "background": "#999999",
        //             "color": "#fff",
        //             "height": "85vh",
        //             "postion": "relative"
        //         }}>
        //             <h1 style={{"top": "50%", "left": "50%", "position": "absolute"}}><YoutubeOutlined/></h1>
        //         </div>
        //     )
        // }

        const video = this.state.video;

        if( !video ) {
            return (
                <div style={{ "width": "67.5%", "background": "#999999", "color": "#fff", "height": "85vh", "postion": "relative" }}>
                    <h1 style={{ "top":"50%", "left": "50%", "position": "absolute" }}><YoutubeOutlined/></h1>
                </div>
            )
        }

        const videoId = video.id;
        const url = `https://www.youtube.com/watch?v=${videoId}`;

        console.log(videoId);
        console.log(url);

        return (
            <div>
                <div className={"embed-responsive embed-responsive-16by9"}>
                    <ResponsivePlayer url={url} onProgress={this.props.handleWatchComplete}/>
                </div>
                <div>
                    <h2>
                        {video.snippet.title}
                    </h2>
                    <div>
                        {video.snippet.description}
                    </div>
                </div>
            </div>
        )
    }
}

export default VideoDetail;