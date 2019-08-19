import { TestBed } from '@angular/core/testing';

import { Toast } from './toast.service';

describe('ToastService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Toast = TestBed.get(Toast);
    expect(service).toBeTruthy();
  });
});
