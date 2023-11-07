import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClientService } from '../../services/http-client.service';
import { SymbolSerializer, PriceSerializer, TodayPriceSerializer } from '../../contracts/contracts';

@Component({
  selector: 'app-hive-mind',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.css']
})
export class PredictionsComponent implements OnInit, OnDestroy  {
  public symbols: SymbolSerializer[]
  public prices: number[]
  private error?: string

  constructor(private http: HttpClientService) {
    this.symbols = []
    this.prices = []
    this.error = undefined
  }

  ngOnInit() {
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
    
  }
}