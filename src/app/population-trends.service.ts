import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopulationTrendsService {

  constructor() { }

  public prefecturesData = [];
  public chartStatus = {
    chartLabels: [],
    chartData: []
  };

  private prefecturesDataSource = new BehaviorSubject(this.prefecturesData);
  private chartStatusSource = new BehaviorSubject(this.chartStatus);

  public prefecturesDataObservable = this.prefecturesDataSource.asObservable();
  public chartStatusObservable = this.chartStatusSource.asObservable();

  public loadPrefectures() {
    this.prefecturesData = this.prefecturesData.concat([
      { data: [], label: '大阪府', prefCode: 'osaka', checked: false },
      { data: [], label: '東京都', prefCode: 'tokyo', checked: false },
      { data: [], label: '京都府', prefCode: 'kyoto', checked: false },
      { data: [], label: '兵庫県', prefCode: 'hyogo', checked: false },
      { data: [], label: '岡山県', prefCode: 'okayama', checked: false },
    ]);
    this.prefecturesDataSource.next(this.prefecturesData);
  }

  public toggle(targetPrefCode: string): void {
    if (!this.chartStatus.chartLabels.length) { // API
      this.chartStatus.chartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    }

    const targetPref = this.prefecturesData.find(pref => pref.prefCode === targetPrefCode);

    if (!targetPref.data.length) { // API
      const randomData = [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)];
      targetPref.data = randomData;
    }

    if (targetPref.checked) {
      targetPref.checked = false;
      this.chartStatus.chartData = this.chartStatus.chartData.filter(pref => pref.prefCode !== targetPref.prefCode);
    } else {
      targetPref.checked = true;
      this.chartStatus.chartData.push({ data: [...targetPref.data], label: targetPref.label, prefCode: targetPref.prefCode, checked: targetPref.checked });
    }
    this.chartStatusSource.next(this.chartStatus);
  }
}
