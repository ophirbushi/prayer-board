import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    const { username, password } = this.form.value;
    localStorage.setItem('auth', username);
    this.router.navigate(['/']);
  }

}
