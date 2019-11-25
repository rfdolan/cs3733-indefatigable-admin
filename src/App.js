import React from 'react';
import VideoPanel from './VideoPanel.js'

class App extends React.Component {
  // initialize state
  state = {

  };

  // Within each tab goes the content for the given tab
  render() {
    return (
      <div>
        <h1>INDEFATIGABLE</h1>
        <form>
          <label style={{display:"inline-block"}}>
              Enter new remote site url: 
              <input type="text" style={{margin:"5px"}} />
              <button type="submit"style={{margin:"5px"}} >Register</button>
          </label>
        </form>
          <br />
            <VideoPanel />
      </div>
    );
  }
}

export default App;
