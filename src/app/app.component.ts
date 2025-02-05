import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { ChartOptions, ChartType } from 'chart.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'corporate-net-zero';

  jsonData: any;
  // data with numeric codes replaced with values
  parsedData = [];
  dataToDisplay = [];
  selectedRows = [];

  numberNetZero = 0;

  // charts
  pieChartLabels = ['Net Zero', 'Not Net Zero'];
  // pieChartData = [this.numberNetZero, this.parsedData.length - this.numberNetZero];
  pieChartData = [50, 100];
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };

  constructor(private http: HttpClient, private papa: Papa) { }

  ngOnInit() {
    this.readCSV()
    this.calculateNetZeroNumber()

    // pie chart
    
  }

  readCSV() {
    //  https://docs.google.com/spreadsheets/d/1kIRn2RuUiMKBEuEtkPRRMJxG3NMRpu1lnuuhiV93zE0/edit?usp=sharing

    const docId = '1kIRn2RuUiMKBEuEtkPRRMJxG3NMRpu1lnuuhiV93zE0'
    const sheetId = 'Data'
    const key = 'AIzaSyCujJHHSQNwwaAdfnyRdt2xBbBaJs5SRss'
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${docId}/values/${sheetId}?key=${key}`

    this.http.get(url, {
      responseType: 'text',
    }).subscribe((response): void => {
      const jsonResponse = JSON.parse(response);
      const asArray = this.papa.unparse(jsonResponse.values)

      const d = this.papa.parse(asArray, {
        header: true,
      });
      this.jsonData = d.data;
      this.parsedData = this.parseDataForCodes(this.jsonData);
      this.dataToDisplay = this.parsedData;
    });
  }

  calculateNetZeroNumber() {
    this.numberNetZero = 0;
    for (let i = 0; i < this.parsedData.length; i++) {
      if (this.parsedData[i]['Net Zero']) {
        this.numberNetZero += 1;
      }
    }
  }

  // replace numberic codes with values
  parseDataForCodes(data) {

    for (let i = 0; i < data.length; i++) {
      // Sector
      let element = data[i]
      switch (element.Sector) {
        case "5": {
          element.Sector = 'Agricultural Input'
          break;
        }
        case "6": {
          element.Sector = 'Animal Product and Commodity'
          break;
        }
        case "7": {
          element.Sector = 'Animal Protein'
          break;
        }
        case "8": {
          element.Sector = 'Food and Beverage'
          break;
        }
        case "9": {
          element.Sector = 'Restaurant and Food Services'
          break;
        }
      }
      // Continents
      switch (element.Continent) {
        case "11": {
          element.Continent = 'Asia'
          break;
        }
        case "12": {
          element.Continent = 'North America'
          break;
        }
        case "13": {
          element.Continent = 'South America'
          break;
        }
        case "14": {
          element.Continent = 'Africa'
          break;
        }
        case "15": {
          element.Continent = 'Antartica'
          break;
        }
        case "16": {
          element.Continent = 'Europe'
          break;
        }
        case "17": {
          element.Continent = 'Australia'
          break;
        }
      }
      // Net-zero
      switch (element['Net Zero']) {
        case "99": {
          element['Net Zero'] = true
          break;
        }
        case "100": {
          element['Net Zero'] = false
          break;
        }
      }
      // Scope
      switch (element.Scope) {
        case "87": {
          element.Scope = 'Scope 1'
          break;
        }
        case "88": {
          element.Scope = 'Scope 2'
          break;
        }
        case "89": {
          element.Scope = 'Scope 3'
          break;
        }
      }
      // Country net zero
      switch (element['Country Net-zero target']) {
        case "1": {
          element['Country Net-zero target'] = 'Yes'
          break;
        }
        case "2": {
          element['Country Net-zero target'] = 'No'
          break;
        }
      }
      
    }
    //);
    return data
  }

  shortlistCompanies() {
    this.dataToDisplay = this.selectedRows;
    this.displayButton('viewAllBtn')
    this.hideButton('shortlistBtn')
  }

  viewAllCompanies() {
    this.dataToDisplay = this.parsedData;
    this.hideButton('viewAllBtn')
    this.hideButton('shortlistBtn')
  }

  updateSelectedRows(event) {
    this.selectedRows = event;
    if (this.selectedRows.length > 0) {
      this.displayButton('shortlistBtn')
    } 
  }

  displayButton(id) {
    const button = document.getElementById(id);
    console.log(button)
    button.classList.remove('opacity-50'); 
    button.classList.remove('cursor-not-allowed'); 
    
  }



  hideButton(id) {
    const button = document.getElementById(id);
    console.log(button)
    button.classList.add('opacity-50'); 
    button.classList.add('cursor-not-allowed'); 
    
  }
}
