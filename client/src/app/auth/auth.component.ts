import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  async onSubmit() {
    const { username, password } = this.form.value;
    try {
      const user = await this.authService.loginOrRegister({ username }).toPromise();
      localStorage.setItem('auth', JSON.stringify(user));
      this.router.navigate(['/']);
    } catch (err) {
      console.error(err);
    }
  }

}
