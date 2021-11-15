$('form').submit(function (event) {
    event.preventDefault();
    convert();
});

function convert() {
    let inputDegree = parseInt($('#inputDegree').val());
    let inputDegreeUnit = $('#selectInputDegreeType').val();
    let convertedDegreeUnit = $('#selectConversionType').val()

    let resultValue = "";

    let request = new XMLHttpRequest(); 
    // TODO: Update url
    request.open("POST", "http://localhost:3030/convert"); 
   request.setRequestHeader('Access-Control-Allow-Origin', '*')
    request.setRequestHeader('Content-Type', 'application/json')

    // wait for the response
    request.addEventListener("readystatechange", function() {
       // checks if we are ready to read response
       if(this.readyState === 4 && this.status === 200) {
            let result = JSON.parse(this.response);
            resultValue = result.resultDegree;
            if (isNaN(inputDegree)) {
                $('#convertedDegree').text('');
                $('#convertedUnit').text(convertedDegreeUnit);
            }
            $('#convertedDegree').text((resultValue.toString().includes('.')) ? resultValue.toFixed(2) : resultValue);
            $('#convertedUnit').text(((convertedDegreeUnit == 'K') ? '' : '\xB0') + convertedDegreeUnit);
        }

    })       

    //send request
    request.send(JSON.stringify({
        "inputDegree": inputDegree, 
        "inputDegreeUnit": inputDegreeUnit, 
        "outputDegreeUnit": convertedDegreeUnit
    }));

}