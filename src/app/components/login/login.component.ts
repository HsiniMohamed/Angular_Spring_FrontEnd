import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from './../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control(''),
    });
  }
  handleLogin() {
    let username = this.formLogin.value.username;
    let password = this.formLogin.value.password;
    console.log(username, password);

    this.authenticationService.login(username, password).subscribe({
      next: (data) => {
        console.log(data);
        this.authenticationService.loadProfile(data);
        this.router.navigateByUrl('admin');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
