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
  public currentSymbol: number
  public price: number
  public statusError : boolean
  public submissionError : boolean
  public submitted: boolean

  constructor(
      private router: Router,
      private http: HttpClientService) {
    this.submitted = false
    this.symbols = []
    this.price = 0.0
    this.submissionError = false
    this.statusError = false
    this.currentSymbol = 0
  }

  async ngOnInit() {
    this.http.getSymbols().subscribe(
      (symbols) => {
        this.symbols = symbols
      },
      (error) => {
        console.log("Can not load symbols.")
      }
    );
  }

  setCurrent(index: number) {
    this.currentSymbol = index
  }

  ngOnDestroy() {
  }

  formatDate(date: Date): string {
    return [date.getFullYear(), date.getMonth(), date.getDate()].join('-')
  }

  onSubmit(index: number) {
    const price: Price = {
      symbol: this.symbols[index].name,
      source: "Human",
      price: this.price,
    }

    this.http.postTodayPrice(price).subscribe(
      response => {
        this.router.navigate(['/history']);
      },
      error => {
        this.submissionError = true
      },
      () => {
      }
    );
  }
}