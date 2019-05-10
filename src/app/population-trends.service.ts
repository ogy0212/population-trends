import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopulationTrendsService {

  constructor(private http: HttpClient) { }

  public prefecturesData = [];
  public chartStatus = {
    chartLabels: [],
    chartData: []
  };

  private prefecturesDataSource = new BehaviorSubject(this.prefecturesData);
  private chartStatusSource = new BehaviorSubject(this.chartStatus);

  public prefecturesDataObservable = this.prefecturesDataSource.asObservable();
  public chartStatusObservable = this.chartStatusSource.asObservable();

  private apiKeyHeader = new HttpHeaders({
    'X-API-KEY':  'XXXXXXXXXXXXXXXXXXXXX',
  });

  public loadPrefectures() {
    const httpOptions = {
      headers: this.apiKeyHeader
    };

    this.http.get('https://opendata.resas-portal.go.jp/api/v1/prefectures', httpOptions).subscribe(resp => {
      resp.result.forEach(pref => {
        this.prefecturesData.push({data: [], label: pref.prefName, prefCode: pref.prefCode, checked: false});
      });
    });
    this.prefecturesDataSource.next(this.prefecturesData);
  }

  public toggleChart(targetPrefCode: string): void {
    const httpOptions = {
      headers: this.apiKeyHeader,
      params: new HttpParams().append('prefCode', targetPrefCode)
    };

    const targetPref = this.prefecturesData.find(pref => pref.prefCode === targetPrefCode);

    if (!this.chartStatus.chartLabels.length || !targetPref.data.length) {
      this.http.get('https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear', httpOptions).subscribe(resp => {
        this.chartStatus.chartLabels = resp.result.data[0].data.map(item => item.year);
        targetPref.data = resp.result.data[0].data.map(item => item.value);
        this.toggle(targetPref);
      });
    } else {
      this.toggle(targetPref);
    }
  }

  private toggle(targetPref) {
    if (targetPref.checked) {
      targetPref.checked = false;
      this.chartStatus.chartData = this.chartStatus.chartData.filter(pref => pref.prefCode !== targetPref.prefCode);
    } else {
      targetPref.checked = true;
      this.chartStatus.chartData.push({
        data: [...targetPref.data],
        label: targetPref.label,
        prefCode: targetPref.prefCode,
        checked: targetPref.checked
      });
    }
    this.chartStatusSource.next(this.chartStatus);
  }
}
