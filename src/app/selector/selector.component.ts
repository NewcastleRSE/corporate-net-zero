import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-selector',
  standalone: false,
  
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.css'
})
export class SelectorComponent {

  @Input() data: any;

  @Output() selected = new EventEmitter()

  sectors = []
  selectedSectors = []

  countries= []
  selectedCountries = []

  scopes= []
  selectedScopes = []

  years= []
  selectedYears = []


  list: any[];

  ngOnInit() {
    this.list = [
      {
        id: 1,
        title: 'Администратор',
        checked: true,
      },
      {
        id: 2,
        title: 'Пользователь',
        checked: false,
      },
      {
        id: 3,
        title: 'Директор',
        checked: true,
      },
      {
        id: 4,
        title: 'Начальник',
        checked: false,
      },
    ]
this.breakdownData()
console.log(this.countries)
  }

  breakdownData() {
    for (let i = 0; i < this.data.length; i++) {
      if (_.filter(this.countries, ['name', this.data[i].Country]).length === 0) {
        this.countries.push({name:this.data[i].Country, selected: false})
      }
      if (_.filter(this.sectors, ['name', this.data[i].Sector]).length === 0) {
        this.sectors.push({name:this.data[i].Sector, selected: false})
      }
      if (_.filter(this.scopes, ['name', this.data[i].Scope]).length === 0) {
        this.scopes.push({name:this.data[i].Scope, selected: false})
      }
      if (_.filter(this.years, ['name', this.data[i].Year]).length === 0) {
        this.years.push({name:this.data[i].Year, selected: false})
      }
    }
  }

// display or hide dropdown
toggleSectors() {
  document.getElementById('sectorsDropdown').classList.toggle('hidden')
}

// get result() {

//   return this.sectors.filter(sector => sector.selected)
// }
get result() {
  return this.list.filter(item => item.checked);
}

closeDropdowns() {

}

}
