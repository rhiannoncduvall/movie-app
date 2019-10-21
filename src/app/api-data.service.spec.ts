import { TestBed } from '@angular/core/testing';

import { APIDataService } from './api-data.service';

describe('APIDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: APIDataService = TestBed.get(APIDataService);
    expect(service).toBeTruthy();
  });
});