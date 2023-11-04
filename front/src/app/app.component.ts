import { Component, OnInit } from '@angular/core';
import { HttpClientService } from './services/http-client.service';
import { StateManagerService } from './services/state-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front';

  constructor(
    private httpClient: HttpClientService,
    private manager: StateManagerService
  ) {

  }

  ngOnInit() {
    const response = this.httpClient.initiliaze()
    this.manager.symbols = response.symbols
    this.manager.submitted = response.submittedToday
  }
}
