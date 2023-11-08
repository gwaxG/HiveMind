import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClientService } from '../../services/http-client.service';
import { SymbolSerializer, PriceSerializer, TodayPriceSerializer } from '../../contracts/contracts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hive-mind',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.css']
})
export class PredictionsComponent implements OnInit, OnDestroy  {
  public symbols: SymbolSerializer[]
  public prices: number[]
  private error?: string
  private submitted: boolean

  constructor(
      private router: Router,
      private http: HttpClientService) {
    this.submitted = false
    this.symbols = []
    this.prices = []
    this.error = undefined
  }

  ngOnInit() {
    this.http.getStatus().subscribe(
      (data) => {
        const status = data["submitted"]
        this.submitted = status
        this.router.navigate(['/history']);
      },
      (error) => {
        this.error = "Error happened while initializing the application. Sad... "
      }
    );

    this.http.getSymbols().subscribe(
      (symbols) => {
        this.symbols = symbols
        this.prices = new Array<number>(this.symbols.length);
      },
      (error) => {
        this.error = "Error happened while initializing the application. Sad... "
      }
    );
  }

  ngOnDestroy() {
  }

  onSubmit() {
    const todayPrices: TodayPriceSerializer[] = []
    for(let key in this.prices) {
      const price = this.prices[key]
      const symbol = this.symbols[key]
      todayPrices.push({
        symbol: symbol,
        source: "Human",
        price: price
      })
    }

    this.http.postTodayPrices(todayPrices).subscribe(
      response => {
        console.log('POST call successful value returned in body', response);
      },
      error => {
        console.error('POST call in error', error);
      },
      () => {
        console.log('The POST observable is now completed.');
      }
    );
  }
}