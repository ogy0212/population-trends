import { Component, OnInit } from '@angular/core';

import { PopulationTrendsService } from 'src/app/population-trends.service';

@Component({
  selector: 'app-prefectures',
  templateUrl: './prefectures.component.html',
  styleUrls: ['./prefectures.component.scss']
})
export class PrefecturesComponent implements OnInit {

  constructor(
    private dataService: PopulationTrendsService
  ) { }

  public prefectures = this.dataService.prefecturesDataObservable;

  ngOnInit() {
    this.dataService.loadPrefectures();
  }

  clicked(prefCode) {
    this.dataService.toggleChart(prefCode);
  }

}
