import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from './app-state';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from './shared/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'client';
  user$: Observable<User>;
  private destroy = new Subject();

  constructor(private state: AppState) { }

  ngOnInit() {
    this.user$ = this.state.select('user');
    
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      this.state.set('user', user);
    }

    this.state.select('user')
      .pipe(
        takeUntil(this.destroy)
      )
      .subscribe(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          localStorage.removeItem('user');
        }
      });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  logout() {
    this.state.set('user', null);
    setTimeout(() => {
      location.href = location.href;
    });
  }
}
