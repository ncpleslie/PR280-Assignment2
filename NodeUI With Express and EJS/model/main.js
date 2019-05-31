module.exports = class MathCalculations {
  // Function can take an array of two arrays [[],[]].
  // The array must be [[num. num, num],[num. num, num]]
  // It will return a object. Either of numbers or an error message
  async main(array) {
    let finalResult = this.initCalculations(array)
    console.log(finalResult)
    return finalResult
  }

  errorCheck(nestedArray) {
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

  calcSum(array) {
    let sum = (a, b) => a + b
    return array.reduce(sum)
  }

  calcRegression(sumXTimesX, sumXTimesY, arrayLength, avgSumX, avgSumY) {
    let beta1 =
      (sumXTimesY - arrayLength * avgSumX * avgSumY) /
      (sumXTimesX - arrayLength * avgSumX * avgSumX)
    let beta0 = avgSumY - beta1 * avgSumX

    return { beta1: beta1, beta0: beta0 }
  }

  calcCorrelation(
    sumXTimesY,
    arrayLength,
    sumOfX,
    sumOfY,
    sumXTimesX,
    sumYTimesY
  ) {
    let topLine = arrayLength * sumXTimesY - sumOfX * sumOfY
    let bottomLine = Math.sqrt(
      (arrayLength * sumXTimesX - sumOfX * sumOfX) *
        (arrayLength * sumYTimesY - sumOfY * sumOfY)
    )
    let rxy = topLine / bottomLine
    let r2 = rxy * rxy
    return r2
  }

  initCalculations(nestedArray) {
    if (this.errorCheck(nestedArray)) {
      let sumOfX = this.calcSum(nestedArray[0])
      let sumOfY = this.calcSum(nestedArray[1])
      let arrayLength = nestedArray[0].length
      let sumYTimesY = 0,
        sumXTimesX = 0,
        sumXTimesY = 0

      for (let i = 0; i < arrayLength; i++) {
        sumXTimesX += nestedArray[0][i] * nestedArray[0][i]
        sumYTimesY += nestedArray[1][i] * nestedArray[1][i]
        sumXTimesY += nestedArray[0][i] * nestedArray[1][i]
      }

      // Regression
      let avgSumX = sumOfX / arrayLength
      // Regression
      let avgSumY = sumOfY / arrayLength
      // Regression
      let regression = this.calcRegression(
        sumXTimesX,
        sumXTimesY,
        arrayLength,
        avgSumX,
        avgSumY
      )

      // Correlation
      let correlation = this.calcCorrelation(
        sumXTimesY,
        arrayLength,
        sumOfX,
        sumOfY,
        sumXTimesX,
        sumYTimesY
      )
      return {
        regressionResult: regression,
        correlationResult: correlation
      }
    } else {
      return 'Error'
    }
  }
}
