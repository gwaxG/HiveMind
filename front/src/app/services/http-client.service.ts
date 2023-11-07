import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SymbolSerializer, PriceSerializer, TodayPriceSerializer } from '../contracts/contracts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  // backend endpoint
  backend: string

  constructor(private http: HttpClient) {
    this.backend = environment.backend
  }

  getSymbols() : Observable<SymbolSerializer[]> {
    return this.http.get<SymbolSerializer[]>(this.backend)
  }

  getPrices() : Observable<PriceSerializer[]> {
    return this.http.get<PriceSerializer[]>(this.backend)
  }

  postTodayPrices(data: TodayPriceSerializer[]) : Observable<any> {
    return this.http.post(this.backend, data)
  }
}
