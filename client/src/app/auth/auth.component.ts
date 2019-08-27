import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppState } from '../app-state';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  signupForm = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  signinForm = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  visited = localStorage.getItem('visited');

  constructor(
    private router: Router,
    private state: AppState,
    private snackbar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  async onSignupSubmit() {
    const { username, password } = this.signupForm.value;

    try {
      const user = await this.authService.signup({ username, password }).toPromise();
      this.state.set('user', user);
      this.router.navigate(['/']);
    } catch (err) {
      if (err && err.status === 409) {
        this.snackbar.open('User already exists', 'OK', { duration: 4000 });
      } else {
        this.snackbar.open('An error occured', 'OK', { duration: 4000 });
      }
    }
  }

  async onSigninSubmit() {
    const { username, password } = this.signinForm.value;

    try {
      const user = await this.authService.signin({ username, password }).toPromise();
      this.state.set('user', user);
      this.router.navigate(['/']);
    } catch (err) {
      if (err && err.status === 401) {
        this.snackbar.open('Bad sign in attempt', 'OK', { duration: 4000 });
      } else {
        this.snackbar.open('An error occured', 'OK', { duration: 4000 });
      }
    }
  }

}
