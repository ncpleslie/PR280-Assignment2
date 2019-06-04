const Model = require('../model/main')

let result = {
  correlationResult: null,
  regressionResult: { beta1: null, beta0: null }
}

// Main routes
exports.getCalcualtions = (req, res, next) => {
  res.render('index', {
    pageTitle: 'Home',
    path: '/index',
    correlation: result.correlationResult,
    regressionBeta1: result.regressionResult.beta1,
    regressionBeta0: result.regressionResult.beta0
  })
}

exports.postCalculations = (req, res, next) => {
  if (req.files) {
    let array = []
    for (let i = 0; i <= 1; i++) {
      let text = req.files.text[i].data.toString()
      text = text.split('\r\n').map(item => {
        return parseFloat(item)
      })
      array.push(text)
    }
    sendToCalculation(array, res)
  } else {
    let array = []
    for (let key in req.body) {
      let arrayOfNumbers = req.body[key].split(/[ ,]+/).map(item => {
        return parseFloat(item)
      })
      array.push(arrayOfNumbers)
    }
    sendToCalculation(array, res)
  }
}

const sendToCalculation = (array, res) => {
  const model = new Model()
  Promise.resolve(model.main(array)).then(value => {
    result = value
  })
  res.redirect('/')
}

exports.get404 = (req, res, next) => {
  res.redirect('/')
}
