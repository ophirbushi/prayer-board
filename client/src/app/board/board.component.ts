import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { PrayerRequestService } from '../shared/prayer-requests.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { snapshot } from '../shared/utils/snapshot';
import { take, takeUntil, pluck, map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { AppState } from '../app-state';
import { Board, User } from '../shared/models';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  @ViewChild('addPrayerRequestFormTpl', { static: true }) addPrayerRequestFormTpl: TemplateRef<any>;
  board$: Observable<Board>;
  usernames$: Observable<string[]>;
  form = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required)
  });
  requests = [];
  user: User = this.state.get('user');
  private componentDestroy = new Subject();

  constructor(
    private state: AppState,
    private route: ActivatedRoute,
    private prayerRequestService: PrayerRequestService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    const board$ = this.board$ = this.route.data.pipe(pluck('board'));
    this.usernames$ = board$.pipe(
      map(board => board.users.map(user => user.username))
    );

    this.board$.pipe(
      takeUntil(this.componentDestroy)
    ).subscribe(board => this.requests = board.prayerRequests);
  }

  ngOnDestroy() {
    this.componentDestroy.next();
    this.componentDestroy.complete();
  }

  openAddPrayerRequestDialog() {
    this.dialog.open(this.addPrayerRequestFormTpl);
  }

  createPrayerRequest() {
    const { value } = this.form;

    const boardId = snapshot(this.route.paramMap).get('id');
    const userId = this.state.get('user')._id;

    this.prayerRequestService.create({ boardId, userId, ...value })
      .pipe(
        take(1),
        takeUntil(this.componentDestroy)
      )
      .subscribe(request => {
        this.snackbar.open('Request saved', 'OK', { duration: 4000 });
        this.form.reset();
        this.requests = this.requests.concat({ ...request, user: this.user });
      }, err => {
        this.snackbar.open('An error occured', 'OK', { duration: 4000 });
        console.error(err);
      });
  }

  isAdmin(user: User): boolean {
    return snapshot(this.board$).adminUser === user._id;
  }

  async deleteRequest(index: number) {
    try {
      await this.prayerRequestService.delete(this.requests[index]._id).toPromise();
      this.requests.splice(index, 1);
      this.requests = this.requests.slice();
    } catch (err) {
      this.snackbar.open('An error occured', 'OK', { duration: 4000 });
      console.error(err);
    }
  }

}
