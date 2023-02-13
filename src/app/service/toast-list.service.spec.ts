import { TestBed } from '@angular/core/testing';

import { ToastListService } from './toast-list.service';

describe('ToastListService', () => {
  let service: ToastListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
