import { Component } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { ChartOptions, ChartType } from 'chart.js';
import Chart from 'chart.js/auto';
import * as _ from 'lodash';
import { count } from 'rxjs';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  jsonData: any;
  // data with numeric codes replaced with values
  parsedData = [];
  dataToDisplay = [];
  selectedRows = [];

  showTable = true;


  // charts
  piechart: any=[];
  byCountryChart: any=[];
  bySectorChart: any=[];

  dataLoaded = false;

  constructor(private http: HttpClient, private papa: Papa) { }

  ngOnInit() {
    this.readCSV()
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
      this.dataLoaded = true;
      this.createPieChart();
      this.createByCountryChart();
   this.createBySectorChart()

    

  });
  }

  // user has configured their query in the selector section
  selectorDataEvent(event) {
 
    
    var countries = []
    var sectors = []
    var scopes = []
    var years = []

    // if all selected, just add all data for that filter
    
    let allCountries = _.find(event.countries, function(o) {return o.name === 'All'})
    if ( allCountries.selected || (_.filter(event.countries, function(o) { return o.selected; }).length === 0)) {
      countries = event.countries.map(function(o) { return o.name; });
   
    } else {
     
       // filter only those that are selected
    var c = _.filter(event.countries, function(o) { return o.selected; });
    countries = c.map(function(o) { return o.name; });
    }
    let allSectors = _.find(event.sectors, function(o) {return o.name === 'All'})
    if ( allSectors.selected || (_.filter(event.sectors, function(o) { return o.selected; }).length === 0)) {
      sectors = event.sectors.map(function(o) { return o.name; });
    } else {
      var s = _.filter(event.sectors, function(o) { return o.selected; });
    sectors = s.map(function(o) { return o.name; });
    }
    let allScopes = _.find(event.scopes, function(o) {return o.name === 'All'})
    if ( allScopes.selected || (_.filter(event.scopes, function(o) { return o.selected; }).length === 0)) {
      scopes = event.scopes.map(function(o) { return o.name; });
    } else {
       var sc = _.filter(event.scopes, function(o) { return o.selected; });
    scopes = sc.map(function(o) { return o.name; });
    }
    let allYears = _.find(event.years, function(o) {return o.name === 'All'})
    if ( allYears.selected || (_.filter(event.years, function(o) { return o.selected; }).length === 0)) {
      years = event.years.map(function(o) { return o.name; });
    } else {
       var y = _.filter(event.years, function(o) { return o.selected; });
    years = y.map(function(o) { return o.name; });
    }


this.dataToDisplay = []

this.parsedData.forEach(el => {
  
  // filter for blank or matching fields
  if ((countries.includes(el.Country)|| el.Country === ''  )&& (sectors.includes(el.Sector)  || el.Sector === '')&& (scopes.includes(el.Scope) || el.Scope === '')&& (years.includes(el['Target date']) || el['Target date'] === '')) {
    this.dataToDisplay.push(el)
  }
})



  }
  

  createByCountryChart() {
    var countries = this.getCountries();
    var data = this.totalsPerCountry()
    
    const notZero = []
    const netZero = []
    Object.keys(data).forEach(key => {
      notZero.push(data[key]['notNetZero'])
      netZero.push(data[key]['netZero'])
    })
    
    
        // Net zero status by country
        this.byCountryChart = new Chart('byCountry', {
          type: 'bar',
          data: {
            labels: countries,
            datasets: [
              {
                label: 'Net zero target',
                data: netZero,
                backgroundColor: '#34d399'
              },
              {
                label: 'No net zero target',
                data: notZero,
                backgroundColor: '#D3346E'
              },
            ],
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Net Zero status by location',
              },
            },
            responsive: true,
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true
              }
            }
          },
    
        })
    
        
      }

      createBySectorChart() {
        var sectors = this.getSectors();
        var data = this.totalsPerSector()
        
        const notZero = []
        const netZero = []
        Object.keys(data).forEach(key => {
          notZero.push(data[key]['notNetZero'])
          netZero.push(data[key]['netZero'])
        })
        
        
            // Net zero status by country
            this.bySectorChart = new Chart('bySector', {
              type: 'bar',
              data: {
                labels: sectors,
                datasets: [
                  {
                    label: 'Net zero target',
                    data: netZero,
                    backgroundColor: '#34d399'
                  },
                  {
                    label: 'No net zero target',
                    data: notZero,
                    backgroundColor: '#D3346E'
                  },
                ],
              },
              options: {
                plugins: {
                  title: {
                    display: true,
                    text: 'Net Zero status by sector',
                  },
                },
                responsive: true,
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    stacked: true
                  }
                }
              },
        
            })
        
            
          }

          getSectors() {
            var sectors = []
            for (let i = 0; i < this.dataToDisplay.length; i++) {
              if (!sectors.includes(this.dataToDisplay[i].Sector)) {
                sectors.push(this.dataToDisplay[i].Sector)
              }
            }
            return sectors
          }          

  getCountries() {
    var countries = []
    for (let i = 0; i < this.dataToDisplay.length; i++) {
      if (!countries.includes(this.dataToDisplay[i].Country)) {
        countries.push(this.dataToDisplay[i].Country)
      }
    }
    return countries
  }

  createPieChart() {
    const netZero = this.calculateNetZeroNumber();
    const notZero = this.parsedData.length - netZero;
    
    this.piechart = new Chart('canvas', {
      type: 'pie',
      data: {
        labels: ['Net Zero Target', 'No Net Zero Target'],
        datasets: [
          {
            label: 'Net zero status',
            data: [netZero, notZero],
            borderWidth: 1,
            backgroundColor: ['#D3346E', '#34d399']
          },
        ],
      },
      options: {
       responsive: true,
       maintainAspectRatio: true,
      },
    });
    
  }
//
  // {'country': 'Australia', 'netZero': 1, 'notNetZero': 2}
  totalsPerSector() {
    const groupBySector = this.dataToDisplay.reduce((r, {Sector, ...rest}) => {
      if (!r[Sector]) {
        r[Sector] = { sector: Sector, data: [rest], netZero: 0, notNetZero: 0 };
      } else {
        r[Sector].data.push(rest);
      }
      return r;
    }, {});
    
    var sectors = Object.keys(groupBySector)
    
    var sectorAndTotals = []
    sectors.forEach(sector => {
      sectorAndTotals[sector] = { 'netZero': 0, 'notNetZero': 0 }
    })
    
    
    Object.entries(groupBySector).forEach(element => {
      var sector = element[1]['sector']
    
      element[1]['data'].forEach(el => {
    if (el['Net Zero']) {
      sectorAndTotals[sector]['netZero'] += 1;
      
    } else {
    
      sectorAndTotals[sector]['notNetZero'] += 1;
      }
    })
    
    
    })   
    
     return sectorAndTotals
      }

  totalsPerCountry() {
const groupByCountry = this.dataToDisplay.reduce((r, {Country, ...rest}) => {
  if (!r[Country]) {
    r[Country] = { country: Country, data: [rest], netZero: 0, notNetZero: 0 };
  } else {
    r[Country].data.push(rest);
  }
  return r;
}, {});

var countries = Object.keys(groupByCountry)

var countryAndTotals = []
countries.forEach(country => {
  countryAndTotals[country] = { 'netZero': 0, 'notNetZero': 0 }
})


Object.entries(groupByCountry).forEach(element => {
  var country = element[1]['country']

  element[1]['data'].forEach(el => {
if (el['Net Zero']) {
  countryAndTotals[country]['netZero'] += 1;
  
} else {

countryAndTotals[country]['notNetZero'] += 1;
  }
})


})   

 return countryAndTotals
  }

  calculateNetZeroNumber(): number {
    
    var netZero = 0;

    for (let i = 0; i < this.dataToDisplay.length; i++) {
      if (this.dataToDisplay[i]['Net Zero']) {
        netZero += 1;
        
      }
      
    }
    return netZero;
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

  switchTab(content) {
   var table = document.getElementById('table')
   var graphs = document.getElementById('graphs')
   table.classList.toggle('hidden')
   graphs.classList.toggle('hidden')

   var tableTab = document.getElementById('tableTab')
   var graphTab = document.getElementById('graphTab')
    tableTab.classList.toggle('cursor-not-allowed')
    graphTab.classList.toggle('cursor-not-allowed')

    tableTab.classList.toggle('pointer-events-none')
    graphTab.classList.toggle('pointer-events-none')

    var tableBorder = tableTab.getElementsByTagName('span')[1]
    var graphBorder = graphTab.getElementsByTagName('span')[1]
   
    tableBorder.classList.toggle('bg-secondary-600')
    graphBorder.classList.toggle('bg-secondary-600')

    //recreate charts based on selected data
   this.clearCharts()
    this.createPieChart();
    this.createByCountryChart();
    this.createBySectorChart();

  }

  clearCharts() {
var chartIds = ['canvas', 'byCountry', 'bySector']
chartIds.forEach(id => {
  let chartStatus = Chart.getChart(id); // <canvas> id
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
})

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
   
    button.classList.remove('opacity-50'); 
    button.classList.remove('cursor-not-allowed'); 
    
  }



  hideButton(id) {
    const button = document.getElementById(id);
  
    button.classList.add('opacity-50'); 
    button.classList.add('cursor-not-allowed'); 
    
  }
}
