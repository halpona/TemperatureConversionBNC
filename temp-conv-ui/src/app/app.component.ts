import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'temp-conv-ui';

  tempUnitsIn = [ 
    { value: "C", description: "\xB0C", selected: true },
    { value: "F", description: "\xB0F" },
    { value: "K", description: "K" },    
  ]

  tempUnitsOut = [ 
    { value: "C", description: "Celcius (\xB0C)" },
    { value: "F", description: "Fahrenheit (\xB0F)", selected: true },
    { value: "K", description: "Kelvin (K)" },    
  ]


  inputDegree = 0;
  inputUnit = 'C';
  outputDegree = 32;
  outputUnit = "F";

  constructor(private http:HttpClient) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.onChangeInUnit();
    this.onChangeOutUnit();

    this.convert()
  }

  onChangeInUnit() {
    this.tempUnitsIn.forEach((t) => { t.selected = (t.value == this.inputUnit) })
  }
  onChangeOutUnit() {
    this.tempUnitsOut.forEach((t) => { t.selected = (t.value == this.outputUnit) })
  }
  convert() {
  
    this.http.post('http://localhost:3030/convert', 
      JSON.stringify({
        "inputDegree": this.inputDegree, 
        "inputDegreeUnit": this.inputUnit, 
        "outputDegreeUnit": this.outputUnit
      }), { 
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      }

    ).subscribe(response => {
      let result: any  = response;
      this.outputDegree = result.resultDegree.toString().includes('.') ? result.resultDegree.toFixed(2): result.resultDegree;

    });
    

}



}
