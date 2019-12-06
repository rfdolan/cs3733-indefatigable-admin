import React from 'react'
import Video from './Video'
import axios from 'axios'
import './style/VideoPanel.css'
import base_url from './api/api.js'

const get_all_videos_url = base_url + "getAllSegments"
const search_url = base_url + "searchSegments"

/*
const sampleData = [{title: "Vid Title", transcript: "It is illogical", url: "https://cs3733-indefatigable.s3.us-east-2.amazonaws.com/media/Kirk-ItIsIllogical.ogg",
character: "Kirk", isRemote: false, isRemoteAvailable: true}, {title: "Vid2 Title", transcript: "Arg", url: "https://cs3733-indefatigable.s3.us-east-2.amazonaws.com/media/fisher-agh.ogg",
character: "Fisher", isRemote: true, isRemoteAvailable: true}];
*/
class VideoPanel extends React.Component {
    _isMounted = false

    state = {
        videos: [],
        charSearch: "",
        transSearch: "",
    }

    // These two functions make us promise not to update the state if the component
    // is not mounted.
    componentDidMount() {
        this._isMounted = true
        this.getAllVideos()
    }

    componentWillUnmount() {
        this._isMounted = false
    }


    getAllVideos = () => {
        axios.get(get_all_videos_url)
            .then((res) => {
                this.setState({videos: res.data.list})
            })
            .then(() => {
                if (this._isMounted) {
                    this.renderVideos()
                }
            })
    }


    renderVideos = () => {
        // Array of JSX videos we want to render.
        let vids = []
        for (let i = 0; i < this.state.videos.length; i++) {
            let currVid = this.state.videos[i]
            // If we are not filtering by local only OR if we are and this is a local video, add it to the array.
            if (!currVid.isRemote) {
                //console.log(currVid);
                vids.push(
                    <li key={currVid.vuid} style={{listStyleType: "none", padding: "5px", float:"left"}}>
                        <Video title={currVid.title} transcript={currVid.transcript} url={currVid.url}
                               character={currVid.character} isRemote={currVid.isRemote}
                               isRemotelyAvailable={currVid.remoteAvailability} id={currVid.vuid}
                               markingHandler={this.getAllVideos}
                        />
                    </li>)
            }
        }
        // Return our JSX tags to render.
        return vids

    }
    searchVideos = () => {
        //console.log("Character: " + this.state.charSearch)
        //console.log("Transcript: " + this.state.transSearch)

        let request = {}
        request["transcript"] = this.state.transSearch
        request["character"] = this.state.charSearch
        //console.log(request)
        let js = JSON.stringify(request)
        //console.log("Request: " + js);
        let xhr = new XMLHttpRequest()
        xhr.open("POST", search_url, true)

        xhr.send(js)

        xhr.onloadend = () => {
            //console.log(xhr);
            //console.log(xhr.request);

            if (xhr.readyState === XMLHttpRequest.DONE) {
                //console.log("XHR:" + xhr.responseText);
                this.processSearchResponse(xhr.responseText)
            } else {
                this.processSearchResponse("N/A")
            }
        }
    }

    processSearchResponse = (res) => {
        if (res === "N/A") {
            console.log("Something went wrong!!!!")
        } else {
            const videos = JSON.parse(res)
            this.setState(videos)
            if (this._isMounted) {
                this.renderVideos()
            }
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter') {
            this.searchVideos()
        }
    }
    
    render() {
        return (
            <div>
                <div>
                <form>
                        <label style={{display: "inline-block"}}>
                            Search Text:
                            <input name="transSearch" type="text" onKeyPress={this.handleKeyPress} 
                            placeholder="Text to search for" onChange={e => this.handleChange(e)} style={{margin: "5px"}}/>
                            Character:
                            <input name="charSearch" type="character" onKeyPress={this.handleKeyPress} 
                            placeholder="Character name" onChange={e => this.handleChange(e)} style={{margin: "5px"}}/>
                            <button type="button" onClick={this.searchVideos}>Go</button>
                        </label>
                    </form>
                </div>
                {this.renderVideos()}
            </div>
        )
    }
}

export default VideoPanel