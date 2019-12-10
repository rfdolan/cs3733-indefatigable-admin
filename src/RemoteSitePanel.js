import React from 'react'
import base_url from './api/api.js'
import RemoteSite from './RemoteSite.js'

const get_url = base_url + "getAllRemoteSites"
const register_url = base_url + "registerRemoteSite"
const create_url = base_url + "registerVideo"

class RemoteSitePanel extends React.Component {
    _isMounted = false

    state = {
        sites: [],
        siteToRegister: "",
    }

    // These two functions make us promise not to update the state if the component
    // is not mounted.
    componentDidMount() {
        this._isMounted = true
        this.getSites()
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    getSites = () => {
        let xhr = new XMLHttpRequest()
        xhr.open("GET", get_url, true)
        //console.log("Sending");
        xhr.send()
        xhr.onloadend = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                this.processGetSitesResponse(xhr.responseText)
            } else {
                this.processGetSitesResponse("N/A")
            }
        }
    }

    processGetSitesResponse = (result) => {
        let js = JSON.parse(result)
        //console.log(js);
        let status = js["statusCode"]
        if (status === 200) {
            console.log("Got")
            console.log(js);
            this.setState({
                sites: js["urls"]
            })
            //this.renderSites();
        } else {
            console.log("Couldn't get")
        }
    }

    registerSite = () => {
        let xhr = new XMLHttpRequest()
        let request = {};
        request["url"] = this.state.siteToRegister;
        let js = JSON.stringify(request);
        xhr.open("POST", register_url, true)
        //console.log("Sending");
        xhr.send(js)
        xhr.onloadend = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                this.processRegisterSiteResponse( xhr.responseText, this.state.siteToRegister)
            } else {
                this.processRegisterSiteResponse( "N/A")
            }
        }
    }

    processRegisterSiteResponse = (result, url) => {
        console.log("done");
        let js = JSON.parse(result)
        let status = js["responseCode"]
        if (status === 200) {
            console.log("Registered")
            //console.log(result);
            this.getSites();
            this.setState({
                siteToRegister: ""
            })
            let uid = js["uid"];
            this.putVideosInDB(url, uid);
        } else {
            console.log("Error registering")
            console.log(js);
        }
    }

    renderSites = () => {
        let sites = [];
        let s;
        for(s of this.state.sites) {
            sites.push(<li  style={{listStyleType: "none"}} key={s}>
                <RemoteSite url={s} deregisterHandler={this.getSites} />
                </li> )
            //console.log(s);
        }
        return sites
    }
    getVideosFromSite = (url, uid) => {

        let xhr = new XMLHttpRequest()
        xhr.open("GET", url, true)
        //console.log("Sending");
        xhr.send()
        xhr.onloadend = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                this.putVideosInDB( xhr.responseText, uid, url)
            } else {
                this.putVideosInDB( "N/A", "", url)
            }
        }

    }
    processGetVideosFromSiteResponse = (result, uid) => {
        console.log(result);
        let js = JSON.parse(result)
        let status = js["responseCode"]
        if (status === 200) {
            console.log("Got, putting to db")
            //console.log(result);
            this.putVideosInDB(uid, result.list);
            
        } else {
            console.log("Error registering")
            console.log(js);
        }

        

    }
    putVideosInDB = ( uid, videos) => {
        for(let i=0; i<videos.length(); i++) {
           let currVid = videos[i]; 
           this.putVideoInDB = (currVid, uid);
        }
        
    }
    putVideoInDB = (video, uid) => {
        //console.log(this.state);

        var data = {}
        // Information from remote site.
        data["transcript"] = video.text;
        data["character"] = video.character;
        data["url"] = video.url;

        data["remoteSiteId"] = uid;

        var js = JSON.stringify(data)
        //console.log("JS:" + js);
        var xhr = new XMLHttpRequest()
        xhr.open("POST", create_url, true)

        // send the collected data as JSON
        xhr.send(js)
        console.log("Sent")

        // This will process results and update HTML as appropriate. 
        xhr.onloadend = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                this.processCreateResponse(xhr.responseText)
            } else {
                this.processCreateResponse("N/A")
            }
        }
    }
    processCreateResponse = (result) => {
        let js = JSON.parse(result)
        let status = js["statusCode"]
        // on success, render playlists again
        //console.log(js);
        if (status === 200) {
            console.log("Registered")
            this.getAllVideos()
        } else {
            console.log("Didn't work dude.")
        }
        this.setState({
            newVideoB64: "",
            newVideoCharacter: "",
            newVideoFile: "",
            newVideoTitle: "",
            newVideoTranscript: ""
        })

    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    /*

    shouldComponentUpdate = () => {
        return false;
    }
    */

    handleKeyPress = (event) => {
        if(event.key === 'Enter') {
            this.registerSite()
        }
    }

    render() {
        //console.log("RENDERING");
        return (
            <div >
                Enter new remote site url: 
                <input type="text" name="siteToRegister" onKeyPress={this.handleKeyPress} value={this.state.siteToRegister} 
                style={{margin:"5px"}} onChange={e => this.handleChange(e)}/>
                <button type="submit" style={{margin:"5px"}} onClick={this.registerSite}>Register</button>
                {this.renderSites()}
            </div>
        )
    }

}

export default RemoteSitePanel