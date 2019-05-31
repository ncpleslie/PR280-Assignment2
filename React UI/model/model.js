export class DataInput {
  constructor(numberGroup) {
    this.numberGroup = numberGroup
  }
  formatNumbers() {
    this.numberGroup = this.numberGroup.split(/[ ,]+/).map(item => {
      return parseInt(item, 10)
    })
  }

  convertTextToArrays() {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()

      reader.onload = e => {
        let ct = reader.result
        let sortedNumbers = ct.split('\n').map(x => parseInt(x, 10))
        resolve(sortedNumbers)
      }
      reader.onerror = e => {
        reject(e)
      }
      reader.readAsText(this.numberGroup)
    })
  }

  getNumbers() {
    return this.numberGroup
  }
}
