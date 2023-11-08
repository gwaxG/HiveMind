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
  
   ngOnInit() {
    
  }

  constructor() {
    this.symbol = "Kek"
  }
}
