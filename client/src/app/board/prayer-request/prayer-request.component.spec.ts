import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayerRequestComponent } from './prayer-request.component';

describe('PrayerRequestComponent', () => {
  let component: PrayerRequestComponent;
  let fixture: ComponentFixture<PrayerRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrayerRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrayerRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
