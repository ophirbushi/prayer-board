import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { PrayerRequestService } from '../shared/prayer-requests.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { snapshot } from '../shared/utils/snapshot';
import { take, takeUntil, pluck, map, filter, finalize } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Board, User, UserMetadata } from '../shared/models';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AuthService } from '../shared/auth.service';
import { LoaderService } from '../shared/loader.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  @ViewChild('addPrayerRequestFormTpl', { static: true }) addPrayerRequestFormTpl: TemplateRef<any>;
  @ViewChild('deleteRequestConfirmTpl', { static: true }) deleteRequestConfirmTpl: TemplateRef<any>;
  board$: Observable<Board>;
  usernames$: Observable<string[]>;
  form = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required)
  });
  prayerRequests = [];
  private componentDestroy = new Subject();
  get userMetadata(): UserMetadata { return this.authService.userMetadata; }

  constructor(
    private route: ActivatedRoute,
    private prayerRequestsService: PrayerRequestService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private authService: AuthService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit() {
    const board$ = this.board$ = this.route.data.pipe(pluck('board'));
    this.usernames$ = board$.pipe(
      map(board => board.users.map(user => user.username))
    );

    this.board$.pipe(
      takeUntil(this.componentDestroy)
    ).subscribe(board => this.prayerRequests = board.prayerRequests);
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
    const userId = this.userMetadata._id;

    this.loaderService.setLoader(true);

    this.prayerRequestsService.create({ boardId, userId, ...value })
      .pipe(
        takeUntil(this.componentDestroy),
        take(1),
        finalize(() => this.loaderService.setLoader(false))
      )
      .subscribe(request => {
        this.snackbar.open('Request saved', 'OK', { duration: 4000 });
        this.form.reset();
        this.prayerRequests = this.prayerRequests.concat({ ...request, user: this.userMetadata });
      }, err => {
        this.snackbar.open('An error occured', 'OK', { duration: 4000 });
        console.error(err);
      });
  }

  isAdmin(user: User): boolean {
    return snapshot(this.board$).adminUser === user._id;
  }

  async deleteRequest(index: number) {
    this.loaderService.setLoader(true);
    try {
      await this.prayerRequestsService.delete(this.prayerRequests[index]._id).toPromise();
      this.prayerRequests.splice(index, 1);
      this.prayerRequests = this.prayerRequests.slice();
      this.loaderService.setLoader(false);
    } catch (err) {
      this.snackbar.open('An error occured', 'OK', { duration: 4000 });
      this.loaderService.setLoader(false);
      console.error(err);
    }
  }

  openDeleteRequestDialog(index: number) {
    this.dialog.open(this.deleteRequestConfirmTpl).beforeClosed().pipe(
      takeUntil(this.componentDestroy),
      take(1),
      filter(result => result === 'yes')
    ).subscribe(() => {
      this.deleteRequest(index);
    });
  }

  onPrayingClick(index: number) {
    const request = this.prayerRequests[index];
    this.prayerRequestsService.notifyPraying({ prayingUserId: this.userMetadata._id, prayerRequestId: request._id })
      .pipe(takeUntil(this.componentDestroy))
      .subscribe({
        error: () => {
          this.snackbar.open('An error has occured. Please try again later.', 'OK');
        }
      });
  }

}
