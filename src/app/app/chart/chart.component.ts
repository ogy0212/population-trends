import { Component, OnInit } from '@angular/core';
import { PopulationTrendsService } from 'src/app/population-trends.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {


  constructor(
    private dataService: PopulationTrendsService
  ) { }

  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      position: 'right',
      onClick: null
    },
    elements: {
      line: {
        fill: false,
        tension: 0
      }
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: '人口数',
          fontSize: 18
        },
        ticks: {
          min: 0
        },
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: '年度',
          fontSize: 18
        },
      }],
    }
  };

  public chartType = 'line';
  public chartLegend = true;

  public chartLabels;
  public chartData;

  ngOnInit() {
    this.dataService.chartStatusObservable.subscribe(data => {
      if (data) {
        this.chartLabels = data.chartLabels;
        this.chartData = data.chartData.filter(pref => pref.data).filter(pref => pref.checked);
      }
    });
  }
}
