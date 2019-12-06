import React from 'react'
import base_url from './api/api.js'
import RemoteSite from './RemoteSite.js'

const get_url = base_url + "getAllRemoteSites"
const register_url = base_url + "registerRemoteSite"

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
            //console.log(result);
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
                this.processRegisterSiteResponse( xhr.responseText)
            } else {
                this.processRegisterSiteResponse( "N/A")
            }
        }
    }

    processRegisterSiteResponse = (result) => {
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
                <input type="text" name="siteToRegister" onKeyPress={this.handleKeyPress} value={this.state.siteToRegister} style={{margin:"5px"}} onChange={e => this.handleChange(e)}/>
                <button type="submit" style={{margin:"5px"}} onClick={this.registerSite}>Register</button>
                {this.renderSites()}
            </div>
        )
    }

}

export default RemoteSitePanel