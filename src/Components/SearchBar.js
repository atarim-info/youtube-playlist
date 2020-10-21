import React, { Component } from 'react';
import  { AutoComplete, Button } from 'antd';
import SearchOutlined from '@ant-design/icons';
const Option = AutoComplete.Option;

class SearchBar extends Component {

    state = {
        videos: []
    };

    componentDidUpdate( prevProps ) {
        if( this.props.video && prevProps.video !== this.props.video ) {
            this.setState({ videos: this.props.videos })
        }
    }

    onSelect = (value, index) => {
        let val = parseInt(index.key, 10);
        this.props.handleSearch( val );
    };

    render() {
        return(
            <div style={{ "textAlign": "center", "background": "#123456", "padding": "20px" }}>
                <AutoComplete
                    size={"large"}
                    style={{ width: 300 }}
                    onSelect={ this.onSelect }
                    onChange={ this.props.onChange }
                    placeholder="Search Video"
                >
                    { this.state.videos.map((video, index)  => <Option key={ index }>{ video.snippet.title }</Option> ) }
                </AutoComplete>
                <Button style={{ "marginLeft":"5px" }} size={"large"}><SearchOutlined/></Button>
            </div>
        );
    }
}

export default SearchBar;