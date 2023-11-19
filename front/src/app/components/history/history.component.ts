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
  public ohlc: OHLC[] = []
  public symbols: Symbol[]
  public currentSymbol = "BTCUSDT"

  constructor(
    private router: Router,
    private http: HttpClientService) {
      this.statusError = false
      this.ohlc = []
      this.symbols = []
  }

  fetchSymbolData(symbol: string) {
    this.currentSymbol = symbol
    this.http.getPrices(symbol).subscribe(
      (ohlc) => {
        console.log("received prices", ohlc)
        this.ohlc = ohlc
      },
      (e) => {
        if (e.error.error == "No user id.")
        {
          this.router.navigate(['']);
        }
        this.statusError = true
      }
    )
  }

  async ngOnInit() {
    this.http.getSymbols().subscribe(
      (symbols) => {
        this.symbols = symbols
      },
      (error) => {
      }
    );

    this.fetchSymbolData("BTCUSDT")
  }
}
