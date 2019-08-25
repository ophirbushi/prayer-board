import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayerRequestsTableComponent } from './prayer-requests-table.component';

describe('PrayerRequestsTableComponent', () => {
  let component: PrayerRequestsTableComponent;
  let fixture: ComponentFixture<PrayerRequestsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrayerRequestsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrayerRequestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
