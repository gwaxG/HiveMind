import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PriceSerializer, SymbolSerializer } from 'src/app/contracts/contracts';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})

export class HistoryComponent implements OnInit {
  public statusError : boolean
  public prices: PriceSerializer[]
  public symbols: SymbolSerializer[]
  public currentSymbol = "BTCUSDT"

  constructor(
    private router: Router,
    private http: HttpClientService) {
      this.statusError = false
      this.prices = []
      this.symbols = []
  }

  fetchSymbolData(symbol: string) {
    this.currentSymbol = symbol
    this.http.getPrices(symbol).subscribe(
      (prices) => {
        this.prices = prices
        console.log("Prices ok")        
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
        console.log("Symbols ok")
        this.symbols = symbols
      },
      (error) => {
        console.log("Can not load symbols.")
      }
    );
    
    this.fetchSymbolData("BTCUSDT")
  }
}
