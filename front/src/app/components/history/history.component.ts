import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})

export class HistoryComponent implements OnInit {
  public statusError : boolean

  constructor(
    private router: Router,
    private http: HttpClientService) {
      this.statusError = false
  }

  ngOnInit() {
    this.http.getStatus().subscribe(
      (data) => {
        const status = data["submitted"]
        console.log(status, " history")
        if (!status)  
        {
          this.router.navigate(['/']);
        }
      },
      (error) => {
        this.statusError = true
      }
    );
  }
}
