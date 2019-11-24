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
          <label>
              Enter new remote site url: 
              <input type="text" />
              <button type="submit">Register</button>
          </label>
        </form>
          <br />
            <VideoPanel />
      </div>
    );
  }
}

export default App;
