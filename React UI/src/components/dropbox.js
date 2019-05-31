import React, { Component } from 'react'
import { DataInput } from '../../model/model'

class DropBox extends Component {
  constructor(props) {
    super(props)
    this.files = []
    this.state = { files: this.files }
  }

  _handleDrop(e) {
    for (let aFile of e.dataTransfer.files) {
      if (aFile.type === 'text/plain') {
        let dataInput = new DataInput(aFile) // Return one array
        Promise.resolve(dataInput.convertTextToArrays()).then(value => {
          this.files.push(value)
          this.setState({ files: this.files })
        })
      }
    }
  }

  dropRef = React.createRef()
  componentDidMount() {
    ;[
      'drag',
      'dragstart',
      'dragend',
      'dragover',
      'dragenter',
      'dragleave',
      'drop'
    ].forEach(dragType => {
      let div = this.dropRef.current
      div.addEventListener(dragType, e => {
        e.preventDefault()
        e.stopPropagation()
        if (dragType === 'drop') this._handleDrop(e)
      })
    })
  }

  _openInputFile = e => {
    this.inputElement.click()
  }

  _addFiles = e => {
    for (let aFile of e.target.files) {
      if (aFile.type === 'text/plain') {
        let dataInput = new DataInput(aFile) // Return one array
        Promise.resolve(dataInput.convertTextToArrays()).then(value => {
          this.files.push(value)
          this.setState({ files: this.files })
        })
      }
    }
    this.setState({ files: this.files })
  }

  render() {
    let pStatement = <p className="app">Drop .txt files here</p>
    if (this.state.files.length !== 0) {
      pStatement = (
        <p className="app">{this.state.files.length} file(s) added</p>
      )
    }

    let button = null
    if (this.state.files.length >= 2) {
      button = (
        <button
          onClick={() => this.props.submitFiles(this.files)}
          className="button"
        >
          Submit Numbers
        </button>
      )
    }

    return (
      <div>
        <form
          className="DropBox"
          ref={this.dropRef}
          onClick={this._openInputFile}
        >
          <input
            type="file"
            multiple
            style={{ display: 'none' }}
            ref={input => (this.inputElement = input)}
            onChange={this._addFiles}
          />
          {pStatement}
        </form>
        {button}
      </div>
    )
  }
}

export default DropBox
