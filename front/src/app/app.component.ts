import { Component, OnInit } from '@angular/core';
import { HttpClientService } from './services/http-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front';

  constructor(
    private httpClient: HttpClientService,
  ) {

  }

  ngOnInit() {
    const response = this.httpClient.getSymbols()
    
  }
}
