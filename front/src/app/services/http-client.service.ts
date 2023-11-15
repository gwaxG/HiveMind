import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SymbolSerializer, PriceSerializer } from '../contracts/contracts';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  headers: any

  public symbols: SymbolSerializer[]
  public prices:  PriceSerializer[]

  public endpoints = {
    prices: environment.backend + "prices/",
    symbols: environment.backend + "symbols/"
  }

  constructor(private http: HttpClient) {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      withCredentials: true
    }

    this.prices = []
    this.symbols = []
  }

  getSymbols() {
    return this.http.get<SymbolSerializer[]>(this.endpoints.symbols, {withCredentials: true});
  }

  getPrices(symbol: string) : Observable<PriceSerializer[]> {
    const url = this.endpoints.prices + "?symbol=" + symbol
    return this.http.get<PriceSerializer[]>(url, {withCredentials: true})
  }

  postTodayPrices(data: PriceSerializer[]) : Observable<any> {
    return this.http.post(this.endpoints.prices, data, {withCredentials: true})
  }
}
