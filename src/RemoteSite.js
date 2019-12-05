import React from 'react'
import base_url from './api/api'
import {FaTrashAlt} from 'react-icons/fa'

class RemoteSite extends React.Component {
    state = {
        site:this.props.url,
    }

    deregisterSite = () => {
        console.log("Trying to deregister.");
    }


    render() {
        //console.log("Rending");
        return (
           <div >
                <h4 style={{maxWidth:"300px", display:"inline-block"}}>{this.state.site}</h4>
                <FaTrashAlt style={{ width:"30px"}} onClick={this.deregisterSite}/>
            </div>
        )
    }
}

export default RemoteSite;