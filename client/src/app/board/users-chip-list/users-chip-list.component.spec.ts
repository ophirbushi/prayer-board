import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersChipListComponent } from './users-chip-list.component';

describe('UsersChipListComponent', () => {
  let component: UsersChipListComponent;
  let fixture: ComponentFixture<UsersChipListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersChipListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersChipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
