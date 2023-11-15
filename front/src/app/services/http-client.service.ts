import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SymbolSerializer, PriceSerializer, OHLCSerializer } from '../contracts/contracts';
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
    return this.http.get<SymbolSerializer[]>(this.endpoints.symbols, {withCredentials: true});
  }

  getPrices(symbol: string) : Observable<OHLCSerializer[]> {
    const url = this.endpoints.prices + "?symbol=" + symbol
    return this.http.get<OHLCSerializer[]>(url, {withCredentials: true})
  }

  postTodayPrices(data: PriceSerializer[]) : Observable<any> {
    return this.http.post(this.endpoints.prices, data, {withCredentials: true})
  }
}
