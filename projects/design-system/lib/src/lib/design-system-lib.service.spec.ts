import { TestBed } from '@angular/core/testing';

import { DesignSystemLibService } from './design-system-lib.service';

describe('DesignSystemLibService', () => {
  let service: DesignSystemLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesignSystemLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
