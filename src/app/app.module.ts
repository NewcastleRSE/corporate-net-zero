import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  provideHttpClient } from '@angular/common/http';
import { TableComponent } from './table/table.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DatacardsComponent } from './datacards/datacards.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SelectorComponent } from './selector/selector.component';
import { DataDisplayComponent } from './data-display/data-display.component';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    HeaderComponent,
    FooterComponent,
    DatacardsComponent,
    HomeComponent,
    AboutComponent,
    SelectorComponent,
    DataDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule,
    FormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }


