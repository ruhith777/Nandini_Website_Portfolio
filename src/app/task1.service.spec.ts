import { TestBed } from '@angular/core/testing';

import { Task1Service } from './task1.service';

describe('Task1Service', () => {
  let service: Task1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Task1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
