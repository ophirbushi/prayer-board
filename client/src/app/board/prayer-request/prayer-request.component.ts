import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PrayerRequest } from 'src/app/shared/models';
import { AuthService } from 'src/app/shared/auth.service';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-prayer-request',
  templateUrl: './prayer-request.component.html',
  styleUrls: ['./prayer-request.component.scss']
})
export class PrayerRequestComponent implements OnInit {
  @Input() prayerRequest: PrayerRequest;
  @Output() deleteClick = new EventEmitter<any>();
  @Output() prayingClick = new EventEmitter<any>();
  @Input() enablePrayingButtonSubject = new Subject<string>();
  prayingButtonEnabled = true;
  get username() { return this.authService.userMetadata ? this.authService.userMetadata.username : null; }
  private destroy = new Subject();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.enablePrayingButtonSubject.pipe(
      takeUntil(this.destroy),
      filter(id => this.prayerRequest._id === id)
    ).subscribe(() => {
      this.prayingButtonEnabled = true;
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  onPrayingClick() {
    this.prayingClick.emit();
    this.prayingButtonEnabled = false;
  }

}
