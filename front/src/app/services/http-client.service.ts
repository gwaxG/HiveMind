import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SymbolSerializer, PriceSerializer, TodayPriceSerializer } from '../contracts/contracts';
import { Observable } from 'rxjs';

const endpoints = {
  status: environment.backend + "status",
  prices: environment.backend + "prices",
  symbols: environment.backend + "symbols"
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  
  constructor(private http: HttpClient) {}

  getStatus() : Observable<any> {
    return this.http.get(endpoints.status)
  }

  getSymbols() : Observable<SymbolSerializer[]> {
    return this.http.get<SymbolSerializer[]>(endpoints.symbols)
  }

  getPrices() : Observable<PriceSerializer[]> {
    return this.http.get<PriceSerializer[]>(endpoints.prices)
  }

  postTodayPrices(data: TodayPriceSerializer[]) : Observable<any> {
    return this.http.post(endpoints.prices, data)
  }
}
