import React from 'react'
import base_url from './api/api.js'
import RemoteSite from './RemoteSite.js'

const get_url = base_url + "getAllRemoteSites"

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
        console.log("Sending")
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
        let status = js["statusCode"]
        if (status === 200) {
            console.log("Got")
            //console.log(result);
            this.setState({
                sites: js["urls"]
            })
            this.renderSites()
        } else {
            console.log("Couldn't get")
        }
    }

    renderSites = () => {
        let sites = []
        for (let i = 0; i < this.state.sites.length; i++) {
            let currSite = this.state.sites[i]
            sites.push(<li key={currSite.url} style={{listStyleType: "none"}}>
                <RemoteSite url={currSite}/></li>)
        }
        return sites
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state.siteToRegister)
    }

    render() {
        //console.log(this.state);
        return (
            <div>
                Enter new remote site url:
                <input type="text" style={{margin: "5px"}}/>
                <button type="submit" name="siteToRegister" value={this.state.siteToRegister}
                        onChange={e => this.handleChange(e)} style={{margin: "5px"}}>Register
                </button>
                <br/>
                {this.renderSites()}
                <br/>
            </div>
        )
    }

}

export default RemoteSitePanel