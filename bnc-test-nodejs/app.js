//const http = require('http');
const express = require('express');
const cors = require('cors');
const hostname = '127.0.0.1';
const port = 3030;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const server = app.listen(port, hostname, () => {
//server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log('Host: ', server.address().address);
  console.log('Port: ', server.address().port);
});



// POST => /questionnaireSubmit => body (application/json)
app.post('/convert', function (request, response) {

  console.log('Incoming Request Method:', request.method)
  console.log('Incoming Request Body: ', request.body)

  const data = new TextEncoder().encode(
    JSON.stringify(request.body)
  )

  let inputDegree = request.body.inputDegree;
  let inputDegreeUnit = request.body.inputDegreeUnit;
  let outputDegreeUnit = request.body.outputDegreeUnit;
  
  let result = convert(inputDegree, inputDegreeUnit, outputDegreeUnit);
  console.log(result);

  response.setHeader('Content-Type', 'application/json');
  response.json({"resultDegree": result});
})


function convert(inputDegree, inputDegreeUnit, convertedDegreeUnit) {
  let resultValue = '';
  if (inputDegreeUnit == convertedDegreeUnit)
        resultValue = inputDegree;
    else {
        switch (inputDegreeUnit) {
            case "C" :
                switch (convertedDegreeUnit) {
                    case "F" :
                        resultValue = eval((inputDegree * (9/5)) + 32);
                        break;
                    case "K" :
                        resultValue = eval(inputDegree + 273.15);
                        break;
                }
                break;
            case "F" :
                switch (convertedDegreeUnit) {
                    case "C" :
                        resultValue = eval((inputDegree - 32) * (5/9));
                        break;
                    case "K" :
                        resultValue = eval((inputDegree + 459.67) * (5/9));
                        break;
                }
                break;
            case "K" :
                switch (convertedDegreeUnit) {
                    case "C" :
                        resultValue = eval(inputDegree - 273.15);
                        break;
                    case "F" :
                        resultValue = eval((inputDegree + 273.15) * (9/5) + 32);
                        break;
                }
                break; 
        }
    }

    return resultValue;
}

 
/*
app.get('/', function(req, res) {
  res.send('Hello World There!');
})
*/


