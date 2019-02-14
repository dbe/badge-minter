import React, { Component } from 'react';
import TokenForm from './TokenForm';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-3 m-auto">
          <TokenForm />
        </div>
      </div>
    );
  }
}

export default App;
