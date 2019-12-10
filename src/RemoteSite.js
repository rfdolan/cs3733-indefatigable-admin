import React from 'react'
import base_url from './api/api'
import {FaTrashAlt} from 'react-icons/fa'

const deregister_url = base_url + "unregisterRemoteSite"

class RemoteSite extends React.Component {
    state = {
        site:this.props.url,
    }

    deregisterSite = () => {
        if(window.confirm("Are you sure?")) {
            let xhr = new XMLHttpRequest()
            let request = {};
            request["url"] = this.state.site;
            let js = JSON.stringify(request);
            xhr.open("POST", deregister_url, true)
            console.log("Sending");
            xhr.send(js)
            xhr.onloadend = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    this.processDeregisterSiteResponse( xhr.responseText)
                } else {
                    //this.processDeregisterSiteResponse( "N/A")
                }
            }
        }
    }

    processDeregisterSiteResponse = (result) => {
        console.log("done");
        let js = JSON.parse(result)
        let status = js["responseCode"]
        if (status === 200) {
            console.log("Deregistered")
            //console.log(result);
            //console.log("Calling the handler");
            this.props.deregisterHandler();
        } else {
            console.log("Error registering")
            console.log(js);
        }
    }


    render() {
        //console.log("Site: " + this.state.site);
        return (
           <div >
                <h4 style={{maxWidth:"400px", display:"inline-block"}}>{this.state.site}</h4>
                <FaTrashAlt style={{ width:"30px"}} onClick={this.deregisterSite}/>
            </div>
        )
    }
}

export default RemoteSite;