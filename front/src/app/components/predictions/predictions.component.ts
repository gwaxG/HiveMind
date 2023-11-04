import { Component } from '@angular/core';

@Component({
  selector: 'app-hive-mind',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.css']
})
export class PredictionsComponent {

  coinNames: string[] = ['Coin name 1', 'Coin name 2', 'Coin name 3'];
  coinPrices: string[] = [];

  constructor() {}

  onSubmit() {
    console.log(this.coinPrices);
    // Navigate to the second page or handle the data as required
  }
}