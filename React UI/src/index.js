import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import DropBox from './components/dropbox.js'
import ManualComponent from './components/manualcomponent'
import { MathCalculations } from './main.js'

import './styles.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.results = {
      regression: { beta1: null, beta0: null },
      correlation: null
    }
    this.state = { results: this.results }
  }

  submitFiles = files => {
    let mathCalculations = new MathCalculations(files)
    mathCalculations.main()
    this.results = mathCalculations.getAllResults()
    this.setState({ results: this.results })
  }

  render() {
    let results
    if (this.state.results.regression.beta1 !== null) {
      results = (
        <div className="results">
          <h1>Regression</h1>
          <p>Beta1: {this.state.results.regression.beta1}</p>
          <p>Beta0: {this.state.results.regression.beta0}</p>
          <h1>Correlation</h1>
          <p>{this.state.results.correlation}</p>
        </div>
      )
    }

    return (
      <div id="app">
        <h1>ReactJS Interface</h1>
        <DropBox submitFiles={this.submitFiles} />
        <ManualComponent submitFiles={this.submitFiles} />
        {results}
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
