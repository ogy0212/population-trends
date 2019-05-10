import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { PrefecturesComponent } from './app/prefectures/prefectures.component';
import { ChartComponent } from './app/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    PrefecturesComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
