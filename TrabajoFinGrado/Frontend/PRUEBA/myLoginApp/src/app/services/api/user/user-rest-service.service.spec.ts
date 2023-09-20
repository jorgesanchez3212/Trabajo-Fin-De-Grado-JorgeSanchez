import { TestBed } from '@angular/core/testing';

import { UserRestServiceService } from './user-rest-service.service';

describe('UserRestServiceService', () => {
  let service: UserRestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
