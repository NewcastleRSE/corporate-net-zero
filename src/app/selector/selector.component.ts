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
   
this.breakdownData()
// this.setDropdownPositions()
  }

  breakdownData() {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].Country.length !== 0 && _.filter(this.countries, ['name', this.data[i].Country]).length === 0) {
        this.countries.push({name:this.data[i].Country, selected: false})
      }
      if (this.data[i].Sector.length !== 0 && _.filter(this.sectors, ['name', this.data[i].Sector]).length === 0) {
        this.sectors.push({name:this.data[i].Sector, selected: false})
      }
      if (this.data[i].Scope.length !== 0 && _.filter(this.scopes, ['name', this.data[i].Scope]).length === 0) {
        this.scopes.push({name:this.data[i].Scope, selected: false})
      }
      if (this.data[i]['Target date'].length !== 0 && _.filter(this.years, ['name', this.data[i]['Target date']]).length === 0) {
        this.years.push({name:this.data[i]['Target date'], selected: false})
      } 
    }

    // sort
    this.countries = _.orderBy(this.countries, ['name'], ['asc'])
    this.sectors = _.orderBy(this.sectors, ['name'], ['asc'])
    this.scopes = _.orderBy(this.scopes, ['name'], ['asc'])
    this.years = _.orderBy(this.years, ['name'], ['asc'])

    /// add all option to top of list
    this.countries.unshift({name: 'All', selected: false})
    this.sectors.unshift({name: 'All', selected: false})
    this.scopes.unshift({name: 'All', selected: false})
    this.years.unshift({name: 'All', selected: false})

    // copy to list that we are going to change
    this.selectedCountries = this.countries
    this.selectedSectors = this.sectors 
    this.selectedScopes = this.scopes
    this.selectedYears = this.years
  }
  

// display or hide dropdown
toggle(dropdown) {
  document.getElementById(dropdown+'Dropdown').classList.toggle('hidden')
  document.getElementById(dropdown+'Dropdown').classList.toggle('block')
}

getPositionXY(element) {
  let rect = element.getBoundingClientRect();
  document.getElementById('gfg').innerHTML =
      'X: ' + rect.x + ', ' + 'Y: ' + rect.y
}

setDropdownPositions() {
  let dropdowns = ['sectors', 'countries', 'scopes', 'years']
  for (let i = 0; i < dropdowns.length; i++) {
    let dropdown = document.getElementById(dropdowns[i]+'Dropdown')
    let button = document.getElementById(dropdowns[i]+'Button')
    console.log(dropdown)
    console.log(button)
    dropdown.style.left = button.offsetLeft + 'px'
    dropdown.style.top = button.offsetTop + button.offsetHeight + 'px'
  }
}

checkUncheckAll(event, dropdownType) {
  // only apply to 'all' option
  if (event.srcElement.id === 'All') {
    
     if (event.target.checked === true) {
      // set all values to true
      if (dropdownType ==='sectors') {
        this.toggleSelectedOnAllFields(this.selectedSectors, true)
      } else if (dropdownType ==='countries') {
        this.toggleSelectedOnAllFields(this.selectedCountries, true)
      } else if (dropdownType ==='scopes') {
        this.toggleSelectedOnAllFields(this.selectedScopes, true)
      } else if (dropdownType ==='years') {
        this.toggleSelectedOnAllFields(this.selectedYears, true)
      }
     } else {
      // set all values to false
      if (dropdownType ==='sectors') {
        this.toggleSelectedOnAllFields(this.selectedSectors, false)
      } else if (dropdownType ==='countries') {
        this.toggleSelectedOnAllFields(this.selectedCountries, false)
      } else if (dropdownType ==='scopes') {
        this.toggleSelectedOnAllFields(this.selectedScopes, false)
      } else if (dropdownType ==='years') {
        this.toggleSelectedOnAllFields(this.selectedYears, false)
      }
     }
  }

}

toggleSelectedOnAllFields(coll, value) {
  coll.forEach(function(el){el.selected = value;}) 
}

updateData() {
  // if all selected, replace with the fu
  this.selected.emit({sectors: this.selectedSectors, countries: this.selectedCountries, scopes: this.selectedScopes, years: this.selectedYears})
}


get result() {
  return this.list.filter(item => item.checked);
}

closeDropdowns() {

}

}
