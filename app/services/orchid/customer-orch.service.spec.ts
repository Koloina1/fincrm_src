import { TestBed } from '@angular/core/testing';

import { CustomerOrchService } from './customer-orch.service';

describe('CustomerOrchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerOrchService = TestBed.get(CustomerOrchService);
    expect(service).toBeTruthy();
  });
});
