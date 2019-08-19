import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AppState } from '../app-state';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl()
  });

  constructor(private router: Router, private authService: AuthService, private state: AppState) { }

  ngOnInit() {
  }

  async onSubmit() {
    const { username } = this.form.value;

    try {
      const user = await this.authService.loginOrRegister({ username }).toPromise();
      this.state.set('user', user);
      this.router.navigate(['/']);
    } catch (err) {
      console.error(err);
    }
  }

}
