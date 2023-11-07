import { Component, Input, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';

class UpMeanDown {
  up: number[] = []
  mean: number[] = []
  down: number[] = []
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() symbol: string
  sigma: number = 2
  
  data: any = {
    real: new UpMeanDown(),
    human: new UpMeanDown(),
    market: new UpMeanDown()    
  }

  public lineChartType: ChartType = "line";
  public chartLabels: string[] = []
  public chartData: any[] = []

  public chartOptions: ChartOptions = {
    scales: {
      y: {
        stacked: false
      },
      x: {
        ticks: {
            autoSkip: true,
            maxTicksLimit: 5
        }
    }
    },
    elements: {
      line: {
        tension: 0.4
      }
    }
  }

  ngOnInit() {
    
  }

  constructor() {

    this.symbol = ""
  }
}
