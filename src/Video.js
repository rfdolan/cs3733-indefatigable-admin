import React from 'react'
import base_url from './api/api'

const mark_url = base_url + "markSegmentAsRemote";
const unmark_url = base_url + "unmarkSegmentAsRemote";

class Video extends React.Component {

    state = {
        title:this.props.title,
        transcript:this.props.transcript,
        url:this.props.url,
        character: this.props.character,
        isRemote: this.props.isRemote,
        isRemotelyAvailable: this.props.isRemotelyAvailable,
        id: this.props.id,
    }


    unmarkRemote = () => {
        if (window.confirm('Are you sure')) {
            let data = {}
            data["vuid"] = this.props.id
            let js = JSON.stringify(data)
            let xhr = new XMLHttpRequest()
            xhr.open("POST", unmark_url, true)
            xhr.send(js)
            xhr.onloadend = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    this.processUnmarkResponse( xhr.responseText)
                } else {
                    this.processUnmarkResponse( "N/A")
                }
            }
        }
    }

    processUnmarkResponse = (result) => {
        let js = JSON.parse(result);
        let status = js["statusCode"];
        if(status === 200) {
            console.log("Unmarked");
            this.props.markingHandler();
        }else{
            console.log("Could not unmark")
        }
    }

    markRemote = () => {
        if (window.confirm('Are you sure')) {
            let data = {}
            data["vuid"] = this.props.id
            let js = JSON.stringify(data)
            let xhr = new XMLHttpRequest()
            xhr.open("POST", mark_url, true)
            xhr.send(js)
            xhr.onloadend = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    this.processMarkResponse( xhr.responseText)
                } else {
                    this.processMarkResponse( "N/A")
                }
            }
        }
    }

    processMarkResponse = (result) => {
        let js = JSON.parse(result);
        let status = js["statusCode"];
        if(status === 200) {
            console.log("Marked");
            //this.props.markingHandler();
        }else{
            console.log("Could not Mark")
        }
    }

    handleMarkClick = () => {
        // If the video segment is remote, unmark it. Else mark it.
        if(this.state.isRemotelyAvailable) {
            console.log("finna unmark");
            this.unmarkRemote();

        }
        else {
            console.log("finna mark");
            this.markRemote();

        }

    }

    render() {
        //console.log(this.state);
        return (
            <div style={{padding:"10px", maxWidth:"325px", backgroundColor: "#3ed2e6", borderRadius: "25px" }}>
                <h3>{this.state.title}</h3>
                <h4>Character: {this.state.character}</h4>
                <h4>Transcript: {this.state.transcript}</h4>
                <video display="block" margin="0 auto" src={this.state.url} width="320" height="240" 
                style={{borderRadius: "25px"}} controls>Your browser does not support this video.</video>
                <label>Remotely available?
                    <input  name="isRemotelyAvailable" type="checkbox" onClick={this.handleMarkClick} 
                    defaultChecked={this.state.isRemotelyAvailable}></input>
                </label>
            </div>
        );
    }
}

export default Video;