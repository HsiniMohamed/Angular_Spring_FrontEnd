import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'digital-banking';
  constructor(private authenticationService: AuthenticationService) {}
  ngOnInit(): void {
    this.authenticationService.loadJwtTokenFromSessionStorage();
  }
}
