module.exports = (data) => {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>
        Add Data
      </title>
      <link rel="stylesheet" href="/css/main.css">
    </head>
    
    <body>
      <h1>Node JS UI</h1>
      <h3>Input two text file:</h3>
      <form action="/send" method="POST" enctype="multipart/form-data">
        <input type="file" accept=".txt" name="text" multiple />
        <button type="submit">Calculate</button>
      </form>
      <hr>
      <h3>Input manually:</h3>
      <form action="/sendmanual" method="POST">
        <input name="array1">
        <input name="array2">
        <button type="submit">Calculate</button>
      </form>
      <h3>Correlation</h3>
      <p> ${data.correlation}
      </p>
      <h3>Regression</h3>
      <p>Beta1: ${data.regression.beta1}
      </p>
      <p>Beta0: ${data.regression.beta0}
      </p>
    </body>
    
    </html>`
}