import React, { Component } from 'react'
import { DataInput } from '../../model/model'

class ManualComponent extends Component {
  constructor(props) {
    super(props)
    this.files = []
    this.state = { files: this.files }
  }

  _addNumbersToArray = e => {}

  _handleKeyDown = event => {
    if (event.key === 'Enter') {
      let dataInput = new DataInput(event.target.value)
      if (this.files.length < 2) {
        dataInput.formatNumbers()
        this.files.push(dataInput.getNumbers())
        this.inputElement.value = null
        this.setState({ files: this.files })
      }
    }
  }

  render() {
    let button
    if (this.files.length >= 2)
      button = (
        <button onClick={() => this.props.submitFiles(this.files)}>
          Submit Files
        </button>
      )

    return (
      <div>
        <p>Alternatively</p>
        <h3>Manually Enter Numbers</h3>
        <p>Each seperated by a space or comma</p>
        <input
          ref={input => (this.inputElement = input)}
          onKeyDown={this._handleKeyDown}
        />
        {button}
      </div>
    )
  }
}

export default ManualComponent
