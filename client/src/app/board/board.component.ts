import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { PrayerRequestService } from '../shared/prayer-requests.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { snapshot } from '../shared/utils/snapshot';
import { take, takeUntil, pluck } from 'rxjs/operators';
import { Toast } from '../shared/lib/toast/toast.service';
import { Subject, Observable } from 'rxjs';
import { AppState } from '../app-state';
import { Board, User } from '../shared/models';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  @ViewChild('addPrayerRequestFormTpl', { static: true }) addPrayerRequestFormTpl: TemplateRef<any>;
  board$: Observable<Board>;
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
    private toast: Toast,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.board$ = this.route.data.pipe(pluck('board'));

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

  createPrayerRequest() {debugger
    const { value } = this.form;

    const boardId = snapshot(this.route.paramMap).get('id');
    const userId = this.state.get('user')._id;

    this.prayerRequestService.create({ boardId, userId, ...value })
      .pipe(
        take(1),
        takeUntil(this.componentDestroy)
      )
      .subscribe(request => {
        this.toast.show('Request saved');
        this.form.reset();
        this.requests.push({ ...request, user: this.user });
      }, err => {
        this.toast.show('An error occured', { type: 'error' });
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
    } catch (err) {
      this.toast.show('An error occured', { type: 'error' });
      console.error(err);
    }
  }

}
