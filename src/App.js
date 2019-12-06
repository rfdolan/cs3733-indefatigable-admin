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
        <h2>REMOTE SITES</h2>
        <RemoteSitePanel />
        <h2>VIDEOS</h2>
        <VideoPanel />
      </div>
    );
  }
}

export default App;
