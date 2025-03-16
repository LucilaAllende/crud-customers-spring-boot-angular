import { TestBed } from '@angular/core/testing';

import { CustomerService } from './customer.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Customer } from '../class/customer';
import { provideHttpClient } from '@angular/common/http';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/customers';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerService, provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes HTTP pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
