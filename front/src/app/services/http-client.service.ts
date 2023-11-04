import { Injectable } from '@angular/core';
import { Statistics } from '../lib/classes';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  backend: string

  constructor(private http: HttpClient) {
    this.backend = environment.backend
  }

  fetchData() {
    this.http.get('https://api.example.com/data').subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  initiliaze(): {symbols: string[], submittedToday: boolean} {
    return {symbols: ["BTCUSDT", "ETHUSDT"], submittedToday: false}
  }

  getStatistics(): {[symbol: string]: Statistics} {
    const stats = {
      "BTCUSDT": new Statistics(
        [1,2,3,4,5,6,7,8,9,10],
        [1,2,3,4,5,6,7,8,9,10],
        [1,2,3,4,5,6,7,8,9,10],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        ["a","b","c","d","e","f","g","h","j","i"]
      ),
      "ETHUSDT": new Statistics(
        [1,2,3,4,5,6,7,8,9,10],
        [1,2,3,4,5,6,7,8,9,10],
        [1,2,3,4,5,6,7,8,9,10],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        ["a","b","c","d","e","f","g","h","j","i"]
      ),
    }
    return stats
  }

  submitPredictions(predictions: {[symbol: string]: number}) {
    
  }
}
