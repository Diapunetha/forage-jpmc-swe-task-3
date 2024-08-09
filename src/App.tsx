import React, { Component } from 'react';
import './App.css';
import { Graph } from './Graph';
import { DataManipulator } from './DataManipulator';
// Import `ServerRespond` from `DataStreamer` as a named import.
import { ServerRespond } from './DataStreamer';
import { DataStreamer } from './DataStreamer';

interface IState {
  data: ServerRespond[],
}

class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const streamer = new DataStreamer();
    streamer.getData((data: ServerRespond[]) => {
      this.setState({ data });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Stock Price Monitor
          </p>
        </header>
        <Graph data={this.state.data} />
      </div>
    );
  }
}

export default App;
