import { TestBed, inject } from '@angular/core/testing';

import { ExampleDataService } from './example-data.service';

describe('ExampleDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExampleDataService]
    });
  });

  it('should be created', inject([ExampleDataService], (service: ExampleDataService) => {
    expect(service).toBeTruthy();
  }));
});
