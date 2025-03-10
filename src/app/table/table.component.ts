import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef, ICellRendererParams, SelectionChangedEvent } from 'ag-grid-community'; // Column Definition Type Interface
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { RowClassRules } from "ag-grid-community"; // or themeBalham, themeAlpine
import type { ICellRendererAngularComp } from "ag-grid-angular";
// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

// Custom Cell Renderer Component
@Component({
  selector: "app-net-zero-renderer",
  standalone: true,
  template: `
    <span>
      @if (value) {
        <img
          [alt]="value"
          [src]="
            'https://www.ag-grid.com/example-assets/icons/' + value + '.png'
          "
          [height]="30"
        />
      }
    </span>
  `,
  styles: [
    "img { width: auto; height: auto; } span {display: flex; height: 100%; justify-content: center; align-items: center} ",
  ],
})
export class netZeroRenderer implements ICellRendererAngularComp {
  // Init Cell Value
  public value!: string;
  agInit(params: ICellRendererParams): void {
    this.value = params.value ? "tick-in-circle" : "cross-in-circle";
  }

  // Return Cell Value
  refresh(params: ICellRendererParams): boolean {
    this.value = params.value;
    return true;
  }
}


@Component({
  selector: 'app-table',
  standalone: false,
  
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
@Input() data;// Row Data: The data to be displayed.

pagination;
paginationPageSize;
paginationPageSizeSelector;

@Output() selectedRows = new EventEmitter<any[]>(); 

// Column Definitions: Defines the columns to be displayed.
colDefs: ColDef[] = [
  { field: "Company Name" },
  { field: "Sector", filter: true },
  { field: "Country", filter: true  },
  { field: "Continent", filter: true  },
  { field: "Net Zero", filter: true, cellRenderer: netZeroRenderer  },
  { field: "Target date"  },
  { field: "Scope", filter: true  },
  { field: "Company Year Revenue", valueFormatter: p => '$' + p.value },
];







ngOnChanges() {
  // todo update table
}

ngOnInit() {  
  this.pagination = true;
this.paginationPageSize = 20;
this.paginationPageSizeSelector = [10, 20, 100];


}

// Handle row selection changed event
onSelectionChanged = (event: SelectionChangedEvent) => {
 this.selectedRows.emit(event.api.getSelectedRows())
};



}


