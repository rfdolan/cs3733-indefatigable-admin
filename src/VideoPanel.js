import React from 'react'
import Video from './Video'
import axios from 'axios'
import './style/VideoPanel.css'
import base_url from './api/api.js'

const get_all_videos_url = base_url + "getAllSegments"
/*
const sampleData = [{title: "Vid Title", transcript: "It is illogical", url: "https://cs3733-indefatigable.s3.us-east-2.amazonaws.com/media/Kirk-ItIsIllogical.ogg",
character: "Kirk", isRemote: false, isRemoteAvailable: true}, {title: "Vid2 Title", transcript: "Arg", url: "https://cs3733-indefatigable.s3.us-east-2.amazonaws.com/media/fisher-agh.ogg",
character: "Fisher", isRemote: true, isRemoteAvailable: true}];
*/
class VideoPanel extends React.Component {
    _isMounted = false;

    state = {
        videos: [],
    }

    // These two functions make us promise not to update the state if the component
    // is not mounted.
    componentDidMount() {
        this._isMounted = true;
        this.getAllVideos();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    uploadNewSegment = () =>{
        console.log("You want to upload a new segment don't you squidward.");
    }
    
    getAllVideos = () => {
        axios.get(get_all_videos_url)
        .then((res) => {this.setState( { videos: res.data.list })})
        .then(() => {if(this._isMounted) {this.renderVideos()}});
    }
    

    renderVideos = () => {
        // Array of JSX videos we want to render.
        let vids = [];
        for(let i=0; i<this.state.videos.length; i++ ) {
            let currVid = this.state.videos[i];
            // If we are not filtering by local only OR if we are and this is a local video, add it to the array.
            if( !currVid.isRemote){
                //console.log(currVid);
                vids.push(<li key={currVid.vuid} style={{listStyleType: "none", padding: "5px", float: "left"}}><Video title={currVid.title} transcript={currVid.transcript} url={currVid.url} 
                    character={currVid.character} isRemote={currVid.isRemote} isRemotelyAvailable={currVid.remoteAvailability} id={currVid.vuid} markingHandler={this.getAllVideos}></Video></li>);
            }
        }
        // Return our JSX tags to render.
        return vids;

    }

    render() {
        return (
            <div>
                <div>
                    <form>
                        <label style={{display:"inline-block"}}>
                            Search:
                            <input type="text" style={{margin: "5px"}} />
                            <select style={{margin: "5px"}}>
                                <option value="any">Any character</option>
                                <option value="Kirk">Kirk</option>
                                <option value="Spock">Spock</option>
                                <option value="McCoy">McCoy</option>
                                <option value="Fisher">Fisher</option>
                            </select>
                            <button type="submit">Go</button>
                        </label>
                    </form>
                </div>
                <br />
                <button type="button" onClick={this.uploadNewSegment}>Upload new video</button><br />
                <br />
                {this.renderVideos()}
            </div>
        );
    }
}

export default VideoPanel;