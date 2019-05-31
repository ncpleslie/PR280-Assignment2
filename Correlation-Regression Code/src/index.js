class MathCalculations {
  // Function can take an array of two arrays [[],[]].
  // Array === [[num. num, num],[num. num, num]]
  // It will return a string. Either or numbers or an error message
  constructor(inputArray) {
    this.inputArray = inputArray
    this.correlation = 0
    this.regression = { beta0: 0, beta1: 0 }
    this.sumXTimesX = 0
    this.sumXTimesY = 0
    this.arrayLength = 0
    this.avgSumX = 0
    this.avgSumY = 0
  }

  main() {
    if (this.errorCheck()) {
      this.initCalculations()
    } else {
      console.log('ERROR')
    }
  }

  initCalculations() {
    let nestedArray = this.inputArray
    this.sumOfX = this.calcSum(nestedArray[0])
    this.sumOfY = this.calcSum(nestedArray[1])
    this.arrayLength = nestedArray[0].length
    this.sumYTimesY = 0
    this.sumXTimesX = 0
    this.sumXTimesY = 0

    for (let i = 0; i < this.arrayLength; i++) {
      this.sumXTimesX += nestedArray[0][i] * nestedArray[0][i]
      this.sumYTimesY += nestedArray[1][i] * nestedArray[1][i]
      this.sumXTimesY += nestedArray[0][i] * nestedArray[1][i]
    }
    this.calcRegression()
    this.calcCorrelation()
  }

  calcSum(array) {
    let sum = (a, b) => a + b
    return array.reduce(sum)
  }

  calcRegression() {
    this.avgSumX = this.sumOfX / this.arrayLength
    this.avgSumY = this.sumOfY / this.arrayLength
    let beta1 =
      (this.sumXTimesY - this.arrayLength * this.avgSumX * this.avgSumY) /
      (this.sumXTimesX - this.arrayLength * this.avgSumX * this.avgSumX)
    let beta0 = this.avgSumY - beta1 * this.avgSumX

    this.regression = { beta1: beta1, beta0: beta0 }
  }

  calcCorrelation() {
    let topLine = this.arrayLength * this.sumXTimesY - this.sumOfX * this.sumOfY
    let bottomLine = Math.sqrt(
      (this.arrayLength * this.sumXTimesX - this.sumOfX * this.sumOfX) *
        (this.arrayLength * this.sumYTimesY - this.sumOfY * this.sumOfY)
    )
    let rxy = topLine / bottomLine
    let r2 = rxy * rxy
    this.correlation = r2
  }

  errorCheck() {
    let nestedArray = this.inputArray
    if (
      !Array.isArray(nestedArray) ||
      nestedArray.length !== 2 ||
      nestedArray[0].length === 0 ||
      nestedArray[1].length === 0 ||
      nestedArray[0].length !== nestedArray[1].length ||
      isNaN(nestedArray[0][0])
    ) {
      return false
    } else {
      return true
    }
  }

  getCorrelation() {
    return this.correlation
  }

  getRegression() {
    return this.regression
  }

  getAllResults() {
    return {
      correlation: this.getCorrelation(),
      regression: this.getRegression()
    }
  }
}

function calculate() {
  const array = [
    [130, 650, 99, 150, 128, 302, 95, 945, 368, 961],
    [186, 699, 132, 272, 291, 331, 199, 1890, 788, 1601]
  ]
  let mathCalculations = new MathCalculations(array)
  mathCalculations.initCalculations()
  let results = mathCalculations.getAllResults()
  let regArray = [1.7279324262069864, -22.55253275203438]
  let corRes = 0.9110637099775758
  console.log(
    regArray[0] === results.regression.beta1 ? true : false,
    regArray[1] === results.regression.beta0 ? true : false,
    results.regression,
    regArray
  )
  console.log(
    corRes === results.correlation ? true : false,
    results.correlation,
    corRes
  )
}

calculate()
