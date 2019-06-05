// This takes in information in the URL. Eg. https://somelink.com/?num,num,num=num,num,num
// It uses this information and returns JSON
const Model = require("../model/model")

let data = {
  correlation: null,
  regression: {
    beta1: null,
    beta0: null
  }
}

module.exports = (req, res) => {
  const url = req.url
  let arrayOfNumbers = getURLInformtion(url)
  let data = getResults(arrayOfNumbers)
  renderResults(data, res)
  res.end()
}

const getResults = arrayOfNumbers => {
  let aModel = new Model(arrayOfNumbers)
  aModel.main()
  data = aModel.getAllResults()
  return data
}

const renderResults = (path, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json"
  })
  res.write(JSON.stringify(path))
  return res.end()
}

const getURLInformtion = url => {
  let dataStart = url.indexOf("?") + 1
  let dataString = url.slice(dataStart)
  let arrayOfStrings = dataString.split("=")
  let arrayOfNumbers = []
  for (let i = 0; i < arrayOfStrings.length; i++) {
    let anArrayOfNumbers = arrayOfStrings[i].split(",").map(Number)
    arrayOfNumbers.push(anArrayOfNumbers)
  }
  return arrayOfNumbers
}
