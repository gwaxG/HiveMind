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
  y: {
    open: number;
    high: number;
    low: number;
    close: number;
  }
}

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {
  @Input() prices!: OHLC[]
  @ViewChild("chart") chart?: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public  seriesHuman: OHLCPoint[]
  public seriesReal: OHLCPoint[]

  constructor()
  {
    this.seriesHuman = []
    this.seriesReal = []

    for  (const price of this.prices )
    {
      const pnt: OHLCPoint = {
        x: new Date(price.date),
        y: {
          open: price.open,
          high: price.high,
          close: price.close,
          low: price.low,
        }
      }
      console.log("point", pnt.x)
      if (price.source == "Human") {
        this.seriesHuman.push(pnt)
      }
    }

    this.chartOptions = {
      series: [
        {
          name: "Real OHLC prices",
          data: [
            {
              x: new Date(1538778600000),
              y: [6629.81, 6650.5, 6623.04, 6633.33]
            },
            {
              x: new Date(1538780400000),
              y: [6632.01, 6643.59, 6620, 6630.11]
            }
          ]
        },
        {
          name: "Predicted OHLC prices",
          data: [
            {
              x: new Date(1538778600000),
              y: [6629.81, 6650.5, 6623.04, 6633.33]
            },
            {
              x: new Date(1538780400000),
              y: [6632.01, 6643.59, 6620, 6630.11]
            }
          ]
        }
      ],
      chart: {
        type: "candlestick",
        width: '100%'
      },
      title: {
        text: "Per day history",
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
