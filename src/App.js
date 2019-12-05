import React from 'react';
import VideoPanel from './VideoPanel.js'
import RemoteSitePanel from './RemoteSitePanel.js'

class App extends React.Component {
  // initialize state
  state = {

  };

  // Within each tab goes the content for the given tab
  render() {
    return (
      <div>
        <h1>INDEFATIGABLE</h1>
        <RemoteSitePanel />
        <br />
        <VideoPanel />
      </div>
    );
  }
}

export default App;
