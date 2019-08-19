import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from './app-state';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'client';
  private destroy = new Subject();

  constructor(private state: AppState) { }

  ngOnInit() {
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
}
