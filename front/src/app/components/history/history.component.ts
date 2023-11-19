import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OHLC, Price, Symbol } from 'src/app/contracts/contracts';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})

export class HistoryComponent implements OnInit {
  public statusError : boolean
  public prices: OHLC[]
  public symbols: Symbol[]
  public currentSymbol = "BTCUSDT"

  constructor(
    private router: Router,
    private http: HttpClientService) {
      console.log("constructing")
      this.statusError = false
      this.prices = []
      this.symbols = []
      console.log("End constructing")
  }

  fetchSymbolData(symbol: string) {
    this.currentSymbol = symbol
    console.log("fetching data for symbol", symbol)
    this.http.getPrices(symbol).subscribe(
      (prices) => {
        this.prices = prices
        console.log("Prices ok")        
      },
      (e) => {
        if (e.error.error == "No user id.")
        {
          console.log("no user id")
          this.router.navigate(['']);
        }
        this.statusError = true
        console.log("Error in fetching symbol data", e)
      }
    )
  }

  async ngOnInit() {
    console.log("init")
    this.http.getSymbols().subscribe(
      (symbols) => {
        console.log("Symbols ok")
        this.symbols = symbols
      },
      (error) => {
        console.log("Can not load symbols.")
      }
    );
    console.log("fetching")
    this.fetchSymbolData("BTCUSDT")
  }
}
