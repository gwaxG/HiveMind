import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClientService } from '../../services/http-client.service';
import { Symbol, Price} from '../../contracts/contracts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hive-mind',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.css']
})
export class PredictionsComponent implements OnInit, OnDestroy  {
  public symbols: Symbol[]
  public prices: number[]
  public statusError : boolean
  public submissionError : boolean
  public submitted: boolean

  constructor(
      private router: Router,
      private http: HttpClientService) {
    this.submitted = false
    this.symbols = []
    this.prices = []
    this.submissionError = false
    this.statusError = false
  }

  async ngOnInit() {
    this.http.getSymbols().subscribe(
      (symbols) => {
        this.symbols = symbols
        this.prices = new Array<number>(symbols.length);
      },
      (error) => {
        console.log("Can not load symbols.")
      }
    );
  }

  ngOnDestroy() {
  }

  formatDate(date: Date): string {
    return [date.getFullYear(), date.getMonth(), date.getDate()].join('-')
  }

  onSubmit() {
    const prices: Price[] = []
    for(let key in this.prices) {
      const price = this.prices[key]
      const symbol = this.symbols[key].name

      prices.push({
        symbol: symbol,
        source: "Human",
        price: price,
      })
    }

    this.http.postTodayPrices(prices).subscribe(
      response => {
        console.log("Received this after sending data", response)
        this.router.navigate(['/history']);
      },
      error => {
        this.submissionError = true
        console.log(error)
      },
      () => {
      }
    );
  }
}