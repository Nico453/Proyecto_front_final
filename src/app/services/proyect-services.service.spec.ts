import { TestBed } from '@angular/core/testing';

import { ProyectServicesService } from './proyect-services.service';

describe('ProyectServicesService', () => {
  let service: ProyectServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProyectServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
