import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SymbolSerializer, PriceSerializer, TodayPriceSerializer } from '../contracts/contracts';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  headers: any

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
  }

  getSymbols(): Observable<SymbolSerializer[]> {
    return this.http.get<SymbolSerializer[]>(this.endpoints.symbols, {withCredentials: true});
  }

  getPrices() : Observable<PriceSerializer[]> {
    return this.http.get<PriceSerializer[]>(this.endpoints.prices, {withCredentials: true})
  }

  postTodayPrices(data: TodayPriceSerializer[]) : Observable<any> {
    return this.http.post(this.endpoints.prices, data, {withCredentials: true})
  }
}
