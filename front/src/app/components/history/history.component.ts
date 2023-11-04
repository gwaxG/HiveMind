import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateManagerService } from '../../services/state-manager.service';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})

export class HistoryComponent implements OnInit {
  constructor(
    private router: Router,
    private manager: StateManagerService,
    private httpClient: HttpClientService) {
  }

  ngOnInit() {
    if (!this.manager.submitted) {
      this.router.navigate(['/predictions'])
    }
    
    this.manager.statistics = this.httpClient.getStatistics()
  }
}
