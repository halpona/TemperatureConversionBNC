$('form').submit(function (event) {
    event.preventDefault();
    convert();
});

//import { hello } from '../../app.js'
//const https = require('https');

function convert() {
    let inputDegree = parseInt($('#inputDegree').val());
    let inputDegreeUnit = $('#selectInputDegreeType').val();
    let convertedDegreeUnit = $('#selectConversionType').val()

    let resultValue = "";
    // const h = require(['helloW'])
    // console.log(h);

    // let url = '/test?some=thing'
    // console.log('url:', url)
    // $.get(url, function (data) {
    //     console.log('client data:', data); // browser console
    //   });


    let request = new XMLHttpRequest(); // create an xmlhttp object
    request.open("POST", "http://localhost:3030/convert"); // means GET stuff in there
    //request.link = 'localhost:3030';
   request.setRequestHeader('Access-Control-Allow-Origin', '*')
  // request.setRequestHeader('Access-Control-Allow-Origin', '*')
    request.setRequestHeader('Content-Type', 'application/json')
    // wait for the response
    request.addEventListener("readystatechange", function() {
       // checks if we are ready to read response
       if(this.readyState === 4 && this.status === 200) {
            // do something with response
            console.log('RESPONSE');
            console.log(this.response);
            // console.log(this.response.body);
            let result = JSON.parse(this.response);
            console.log(result);
            console.log(result.resultDegree);
            resultValue = result.resultDegree;


            if (isNaN(inputDegree)) {
                $('#convertedDegree').text('');
                $('#convertedUnit').text(convertedDegreeUnit);
            }
        
            console.log("RESULT VALUE:", resultValue);
            // Update Result Degree and Unit
            $('#convertedDegree').text((resultValue.toString().includes('.')) ? resultValue.toFixed(2) : resultValue);
            $('#convertedUnit').text(((convertedDegreeUnit == 'K') ? '' : '\xB0') + convertedDegreeUnit);
           

        } 
        // else {
        //     console.log('NON200RESPONSE');
        //     console.log(this.response);
        //     console.log(this.response.body);
        // }

    })       

    //send request
    request.send(JSON.stringify({
        "inputDegree": inputDegree, 
        "inputDegreeUnit": inputDegreeUnit, 
        "outputDegreeUnit": convertedDegreeUnit
    })); 

    //  requirejs(["app.js"], function () {
    //      console.log("REQUIREJS");
    //  });
    //console.log(hello());
   
   // console.log(helloW("a", 's', 'sa'));

    
    // const data = new TextEncoder().encode(
    //     JSON.stringify({"he":"wo"})
    // )

    // const options = {
    //     hostname: 'localhost',
    //     port: 3030,
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }

    // const req = https.request(options, res => {
    //     console.log(`statusCode: ${res.statusCode}`)

    //     console.log(`RESPONSE: ${res}`)

    // })

    // req.on('error', error => {
    //     console.error(error);
    // })

    // req.write(data);
    // req.end()







    // if (inputDegreeUnit == convertedDegreeUnit)
    //     resultValue = inputDegree;
    // else {
    //     switch (inputDegreeUnit) {
    //         case "C" :
    //             switch (convertedDegreeUnit) {
    //                 case "F" :
    //                     resultValue = eval((inputDegree * (9/5)) + 32);
    //                     break;
    //                 case "K" :
    //                     resultValue = eval(inputDegree + 273.15);
    //                     break;
    //             }
    //             break;
    //         case "F" :
    //             switch (convertedDegreeUnit) {
    //                 case "C" :
    //                     resultValue = eval((inputDegree - 32) * (5/9));
    //                     break;
    //                 case "K" :
    //                     resultValue = eval((inputDegree + 459.67) * (5/9));
    //                     break;
    //             }
    //             break;
    //         case "K" :
    //             switch (convertedDegreeUnit) {
    //                 case "C" :
    //                     resultValue = eval(inputDegree - 273.15);
    //                     break;
    //                 case "F" :
    //                     resultValue = eval((inputDegree + 273.15) * (9/5) + 32);
    //                     break;
    //             }
    //             break; 
    //     }
    // }



    /*

    if (isNaN(inputDegree)) {
        $('#convertedDegree').text('');
        $('#convertedUnit').text(convertedDegreeUnit);
    }

    console.log("RESULT VALUE:", resultValue);
    // Update Result Degree and Unit
    $('#convertedDegree').text((resultValue.toString().includes('.')) ? resultValue.toFixed(2) : resultValue);
    $('#convertedUnit').text(((convertedDegreeUnit == 'K') ? '' : '\xB0') + convertedDegreeUnit);
    //$('#convertedUnit').text(convertedDegreeUnit);
    //$('#degree')[0].style.visibility = (convertedDegreeUnit == 'K') ? 'hidden' : '';
    //console.log($('#degree')[0].style.visibility);


    */
}