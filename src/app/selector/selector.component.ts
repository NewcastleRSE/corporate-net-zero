import { Component, Input, Output, EventEmitter } from '@angular/core';
import { get } from 'lodash';

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

  ngOnInit() {
this.breakdownData()
  }

  breakdownData() {
    for (let i = 0; i < this.data.length; i++) {
      if (!this.countries.includes(this.data[i].Country)) {
        this.countries.push(this.data[i].Country)
      }
      if (!this.sectors.includes(this.data[i].Sector)) {
        this.sectors.push(this.data[i].Sector)
      }
      if (!this.scopes.includes(this.data[i].Scope)) {
        this.scopes.push(this.data[i].Scope)
      }
      if (!this.years.includes(this.data[i].Year)) {
        this.years.push(this.data[i].Year)
      }
    }
  }

// display or hide dropdown
toggleSectors() {
  document.getElementById('sectorsDropdown').classList.toggle('hidden')
}


closeDropdowns() {

}

}
