import { Component, Input, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { StateManagerService } from 'src/app/services/state-manager.service';

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
    console.log(this.manager.submitted)
    this.chartLabels = this.manager.statistics[this.symbol].labels
    const stats = this.manager.statistics[this.symbol]
    
    const ids = ["realup", "realmean", "realdown", "humanup", "humanmean", "humandown", "marketup", "marketmean", "marketdown"]
    const datasets = [
      this.data.real.up,  
      this.data.real.mean,
      this.data.real.down,
      this.data.human.up,  
      this.data.human.mean,
      this.data.human.down,
      this.data.market.up,  
      this.data.market.mean,
      this.data.market.down,
    ]
    
    this.chartData = [
      { 
        label: "realup",
        borderColor: 'red',
        fill: false,
        data: this.data.real.up, 
        smooth: 0.4,
      },
      { 
        label: "realmean",
        borderColor: 'red',
        fill: false,
        data: this.data.real.up, 
        smooth: 0.4,
      },
      { 
        label: "realup",
        borderColor: 'red',
        fill: false,
        data: this.data.real.up, 
        smooth: 0.4,
      },
      { 
        label: "realup",
        borderColor: 'red',
        fill: false,
        data: this.data.real.up, 
        smooth: 0.4,
      },
      { 
        label: "realup",
        borderColor: 'red',
        fill: false,
        data: this.data.real.up, 
        smooth: 0.4,
      },
      { 
        label: "realup",
        borderColor: 'red',
        fill: false,
        data: this.data.real.up, 
        smooth: 0.4,
      },
      { 
        label: "realup",
        borderColor: 'red',
        fill: false,
        data: this.data.real.up, 
        smooth: 0.4,
      },
      { 
        label: "realup",
        borderColor: 'red',
        fill: false,
        data: this.data.real.up, 
        smooth: 0.4,
      },
      { 
        label: "realup",
        borderColor: 'red',
        fill: false,
        data: this.data.real.up, 
        smooth: 0.4,
      },
    ]
  }

  constructor(
    private manager: StateManagerService) {

    this.symbol = ""
  }
}
