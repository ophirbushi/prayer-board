import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppState } from '../app-state';
import { Toast } from '../shared/lib/toast/toast.service';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(4)])
  });

  constructor(
    private router: Router,
    private state: AppState,
    private toast: Toast,
    private usersService: UsersService
  ) { }

  ngOnInit() {
  }

  async onSubmit() {
    const { username } = this.form.value;

    try {
      const user = await this.usersService.loginRegister({ username }).toPromise();
      this.state.set('user', user);
      this.router.navigate(['/']);
    } catch (err) {
      this.toast.show('An error occured', { type: 'error' });
    }
  }

}
