import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  provideHttpClient } from '@angular/common/http';
import { TableComponent } from './table/table.component';
import { AgGridModule } from 'ag-grid-angular';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DatacardsComponent } from './datacards/datacards.component';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    HeaderComponent,
    FooterComponent,
    DatacardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule,
    BaseChartDirective
  ],
  providers: [provideHttpClient(), provideCharts(withDefaultRegisterables())],
  bootstrap: [AppComponent]
})
export class AppModule { }


