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
    return renderHTML(index(data), res)
  }
  // This route is for handling manually input numbers
  if (url === '/sendmanual' && method === "POST") {
    return handleManual(req, res)
  }
  // This route is for handling file inputs
  if (url === '/send' && method === "POST") {
    return handleFile(req, res) 
  }
  res.end()
}

const renderHTML = (path, res) => {
  res.write(path)
  return res.end()
}

const handleFile = (req, res) => {
  const body = []
  req.on('data', (chunk) => {
    body.push(chunk)
  })
  req.on('end', () => {
    const parsedBody = Buffer.concat(body).toString()
    arrayOfData = postFiles(parsedBody)
    let aModel = new Model(arrayOfData)
    aModel.main()
    data = aModel.getAllResults()
  })
  res.statusCode = 302
  res.setHeader('Location', '/')
  return res.end()
}

const handleManual = (req, res) => {
  const body = []
  req.on('data', (chunk) => {
    body.push(chunk)
  })
  req.on('end', () => {
    const parsedBody = Buffer.concat(body).toString()
    arrayOfData = postManual(parsedBody)
    let aModel = new Model(arrayOfData)
    aModel.main()
    data = aModel.getAllResults()
  })
  res.statusCode = 302
  res.setHeader('Location', '/')
  return res.end()
}

const postManual = (parsedBody) => {
  let data = parsedBody.replace(/%2C\+/g, ' ')
  data = parsedBody.replace(/\+/g, ' ')
  data = data.split('&')
  const input1 = data[0].split('=')[1].split(' ').map((item) => {
    return parseInt(item, 10)
  })
  const input2 = data[1].split('=')[1].split(' ').map((item) => {
    return parseInt(item, 10)
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
    cleanedArray1.push(parseInt(halfCleaned[i].replace(/\D/g, ''), 10))
  }
  for (let i = (halfCleaned.length / 2) + 2; i < halfCleaned.length; i++) {
    cleanedArray2.push(parseInt(halfCleaned[i].replace(/\D/g, ''), 10))
  }
  const cleanedArray = [cleanedArray1, cleanedArray2]
  return cleanedArray
}

// I CAN USE THE FOLLOW FUNCTION TO RENDER HTML PAGES IF NEEDED
// It has been removed due to being unable to send data to the html page
/* 
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
} */
