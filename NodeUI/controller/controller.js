// The purpose of this file is to handle routes, get requests, and post requests.
// It will take the data and format it into a format the the model can handle
// It then re-renders the index page with the relevant info

const fs = require('fs')

const index = require('../views/index')
const Model = require('../model/model')
//const aModel = new Model()

let arrayOfData

let data = {
  correlation: null,
  regression: {
    beta1: null,
    beta0: null
  }
}

module.exports = (req, res) => {
  const url = req.url
  const method = req.method

  if (url === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    return renderHTML(__dirname + '/index.html', res)
  }
  if (url === '/results') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    return renderResults(index(data), res)
  }
  // This route is for handling manually input numbers
  if (url === '/sendmanual' && method === "POST") {
    return handleInput(req, res, postManual)
  }
  // This route is for handling file inputs
  if (url === '/send' && method === "POST") {
    return handleInput(req, res, postFiles)
  }
  res.end()
}

const renderResults = (path, res) => {
  res.write(path)
  return res.end()
}

const renderHTML = (path, res) => {
  fs.readFile(path, null, (err, data) => {
    if (err) {
      res.writeHead(404)
      res.write('no file found')
    } else {
      res.write(data)
    }
    return res.end()
  })
}

const handleInput = (req, res, nextFunction) => {
  const body = []
  req.on('data', (chunk) => {
    body.push(chunk)
  })
  req.on('end', () => {
    const parsedBody = Buffer.concat(body).toString()
    arrayOfData = nextFunction(parsedBody)
    let aModel = new Model(arrayOfData)
    aModel.main()
    data = aModel.getAllResults()
  })
  res.statusCode = 302
  res.setHeader('Location', '/results')
  return res.end()
}

const postManual = (parsedBody) => {
  let data = parsedBody.replace(/%2C\+/g, ' ')
  data = parsedBody.replace(/\+/g, ' ')
  data = data.split('&')
  const input1 = data[0].split('=')[1].split(' ').map((item) => {
    return parseFloat(item)
  })
  const input2 = data[1].split('=')[1].split(' ').map((item) => {
    return parseFloat(item)
  })
  const arrayOfData = [input1, input2]
  return arrayOfData
}

const postFiles = (parsedBody) => {
  const splitBody = parsedBody.split('\n')
  const halfCleaned = []
  for (let i = 4; i < splitBody.length - 2; i++) {
    halfCleaned.push(splitBody[i])
  }
  const cleanedArray1 = []
  const cleanedArray2 = []

  for (let i = 0; i < (halfCleaned.length / 2) - 2; i++) {
    cleanedArray1.push(parseFloat(halfCleaned[i].replace(/\D/g, '')))
  }
  for (let i = (halfCleaned.length / 2) + 2; i < halfCleaned.length; i++) {
    cleanedArray2.push(parseFloat(halfCleaned[i].replace(/\D/g, '')))
  }
  const cleanedArray = [cleanedArray1, cleanedArray2]
  return cleanedArray
}