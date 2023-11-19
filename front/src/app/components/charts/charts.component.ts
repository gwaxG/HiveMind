import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { OHLC } from 'src/app/contracts/contracts';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};

type OHLCPoint = {
  x: Date;
  y: number[]
}

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  @ViewChild("chart") chart?: ChartComponent

  @Input() prices!: OHLC[]
  public chartOptions!: Partial<ChartOptions>
  public  seriesHuman!: OHLCPoint[]
  public seriesReal!: OHLCPoint[]

  constructor() {}

  ngOnInit() {
    this.seriesHuman = []
    this.seriesReal = []
    console.log("Constructing charts", this.prices)

    for  (const price of this.prices )
    {
      const pnt: OHLCPoint = {
        x: new Date(price.date),
        y: [price.open, price.high, price.close, price.low,]
      }
      
      if (price.source == "Human") {
        this.seriesHuman.push(pnt)
      } else {
        this.seriesReal.push(pnt)
      }
    }

    this.chartOptions = {
      series: [
        {
          name: "Real OHLC prices",
          data: this.seriesReal
        },
        {
          name: "Predicted OHLC prices",
          data: this.seriesHuman
        }
      ],
      chart: {
        type: "candlestick",
        width: '100%'
      },
      title: {
        text: "Daily history",
        align: "left"
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        tooltip: {
        }
      }
    };
  }

}
