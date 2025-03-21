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

  it('should fetch customers from API', () => {
    const mockCustomers: Customer[] = [
      new Customer('John', 'Doe', 'john@example.com', 1),
      new Customer('Jane', 'Smith', 'jane@example.com', 2),
    ];

    service.getCustomers().subscribe(customers => {
      expect(customers.length).toBe(2);
      expect(customers).toEqual(mockCustomers);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockCustomers);
  });

  it('should create a new customer', () => {
    const newCustomer = new Customer('Alice', 'Brown', 'alice@example.com');
    
    service.createCustomer(newCustomer).subscribe(customer => {
      expect(customer).toEqual({ ...newCustomer, id: 3 }); // Simula que el backend devuelve un id
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush({ ...newCustomer, id: 3 });
  });

  it('should delete a customer by ID', () => {
    const customerId = 1;

    service.deleteCustomerById(customerId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${apiUrl}/${customerId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
