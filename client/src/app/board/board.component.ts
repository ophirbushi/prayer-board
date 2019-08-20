import { Component, OnInit, OnDestroy } from '@angular/core';
import { PrayerRequestService } from '../shared/prayer-requests.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { snapshot } from '../shared/utils/snapshot';
import { take, takeUntil, map } from 'rxjs/operators';
import { Toast } from '../shared/lib/toast/toast.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  form = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required)
  });

  requests = [];

  private componentDestroy = new Subject();

  constructor(
    private route: ActivatedRoute,
    private prayerRequestService: PrayerRequestService,
    private toast: Toast
  ) { }

  ngOnInit() {
    this.route.data.pipe(
      takeUntil(this.componentDestroy),
      map(data => data.prayerRequests)
    ).subscribe(prayerRequests => this.requests = prayerRequests);
  }

  ngOnDestroy() {
    this.componentDestroy.next();
    this.componentDestroy.complete();
  }

  createPrayerRequest() {
    const { value } = this.form;

    const boardId = snapshot(this.route.paramMap).get('id');

    this.prayerRequestService.create({ boardId, ...value })
      .pipe(
        take(1),
        takeUntil(this.componentDestroy)
      )
      .subscribe(request => {
        this.toast.show('Request saved');
        this.form.reset();
        this.requests.push(request);
      }, err => {
        this.toast.show('An error occured', { type: 'error' });
      });
  }

}
