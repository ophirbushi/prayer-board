import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from './app-state';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

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
    this.state.select('user')
      .pipe(
        takeUntil(this.destroy),
        filter(user => !!user)
      )
      .subscribe(user => {
        localStorage.setItem('user', JSON.stringify(user));
      });

    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      this.state.set('user', user);
    }
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
