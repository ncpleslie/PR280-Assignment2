#!/usr/bin/env node

const inquirer = require("inquirer")
const chalk = require("chalk")
const figlet = require("figlet")
const shell = require("shelljs")
const fs = require("fs")
const path = require('path')

const Model = require('./model/model')

class NodeCommands {
  constructor() {
    this.title = "NodeCLI"
    this.resultsFilename = 'results.txt'
    this.numberOfInputFiles = 2
    this.arrayOfData = []
    this.answers = null
    this.results = null
    this.correlation = 0
    this.regressionBeta0 = 0
    this.regressionBeta1 = 0
  }

  init () {
    console.log(
      chalk.green(
        figlet.textSync(this.title, {
          font: "Standard",
          horizontalLayout: "default",
          verticalLayout: "default"
        })
      )
    )
  }
  
  createFile() {
    fs.writeFile(this.resultsFilename, `Results\nCorrelation: ${this.correlation}\nRegression:\nBeta0: ${this.regressionBeta0}\nBeta1: ${this.regressionBeta1}`, (err)=> {
      if (err) (chalk.white.bgRed.bold(err))
      this.success()
    })
  }
  
  readFile(filename) {
    if (path.extname(filename) === '.txt') {
      let data = fs.readFileSync(`${__dirname}\\${filename}`, "utf-8")
      console.log(chalk.white.bgGreen.bold(`Read ${filename} successfully`))
      return data.split('\r\n').map(Number)
    } else {
      console.log(chalk.white.bgRed.bold(`Error loading ${filename}`))
      return false
    }
  }
  
  success() {
    console.log(chalk.white.bgGreen.bold(`Done! Results file created called ${this.resultsFilename}`))
  }
  
  askQuestions() {
    const questions = [{
      type: "input",
      name: "FILENAME",
      message: "What is the name of the file?"
    }]
    return inquirer.prompt(questions)
  }
  
  askMathQuestions () {
    const questions = [{
      type: "confirm",
      name: "MATHFUNCTIONS",
      message: "Would you like to find out the Correlation and Regression?"
    }]
    return inquirer.prompt(questions)
  }
  
  askInitialQuestion() {
    const questions = [{
      name: "RESPONSE",
      type: "confirm",
      message: "Is the text file in the src folder?"
    }]
    return inquirer.prompt(questions)
  }
  
  askSaveAnswers() {
    const questions = [{
      name: "RESPONSE",
      type: "confirm",
      message: "Save this as a file?"
    }]
    return inquirer.prompt(questions)
  }
  
  getResults () {
    let model = new Model(this.arrayOfData)
    model.main()
    this.results = model.getAllResults()
    this.correlation = this.results.correlation
    this.regressionBeta0 = this.results.regression.beta0
    this.regressionBeta1 = this.results.regression.beta1
    console.log(chalk.white.bgGreen.bold(`Correlation: ${this.correlation}`))
    console.log(chalk.white.bgGreen.bold(`Regression:`))
    console.log(chalk.white.bgGreen.bold(`Beta0: ${this.regressionBeta0}`))
    console.log(chalk.white.bgGreen.bold(`Beta0: ${this.regressionBeta1}`))
  }
  
  exitCLI () {
    console.log(chalk.white.bgRed.bold(`Exiting...`))
    process.exit()
  }
  
  async run () {
 
    this.init()
    await this.askInitialQuestion()
  

    for (let i=0;i<this.numberOfInputFiles;i++) {
      this.answers = await this.askQuestions()
    let {
      FILENAME
    } = this.answers

    this.arrayOfData.push(this.readFile(FILENAME.trim()))
    }
   

    this.answers = await this.askMathQuestions()
    if(this.answers.MATHFUNCTIONS) {
  
      this.getResults()
    } else {
      this.exitCLI()
    }
  
    this.answers = await this.askSaveAnswers()
    if (this.answers.RESPONSE) {
      this.createFile()
    } else {
      this.exitCLI()
    }  
  }
}

const run = () => {
  const nodeCommands = new NodeCommands()
  nodeCommands.run()
}

run()