import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Symbol,Price, OHLC } from '../contracts/contracts';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  public endpoints = {
    prices: environment.backend + "prices/",
    symbols: environment.backend + "symbols/"
  }

  constructor(private http: HttpClient) {

  }

  getSymbols() {
    return this.http.get<Symbol[]>(this.endpoints.symbols, {withCredentials: true});
  }

  getPrices(symbol: string) : Observable<OHLC[]> {
    const url = this.endpoints.prices + "?symbol=" + symbol
    return this.http.get<OHLC[]>(url, {withCredentials: true})
  }

  postTodayPrice(data: Price) : Observable<any> {
    return this.http.post(this.endpoints.prices, data, {withCredentials: true})
  }
}
