import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListComponent } from './customer-list.component';
import { CustomerService } from '../../service/customer.service';
import { Customer } from '../../class/customer';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let customerServiceSpy: jasmine.SpyObj<CustomerService>;

  beforeEach(async () => {
    customerServiceSpy = jasmine.createSpyObj('CustomerService', ['getCustomers', 'deleteCustomerById']);

    const mockCustomers: Customer[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
      { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' }
    ];

    customerServiceSpy.getCustomers.and.returnValue(of(mockCustomers));
    customerServiceSpy.deleteCustomerById.and.returnValue(of(void 0));
    
    await TestBed.configureTestingModule({
      imports: [CustomerListComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: CustomerService, useValue: customerServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call listCustomers on init', () => {
    const listCustomersSpy = spyOn(component, 'listCustomers').and.callThrough();
    component.ngOnInit();
    expect(listCustomersSpy).toHaveBeenCalled();
  });

  it('should list customers on init', () => {
    expect(component.customers.length).toBe(2);
    expect(component.customers[0].firstName).toBe('John');
  });

  it('should render customers in the table', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tableRows = compiled.querySelectorAll('tbody tr');

    expect(tableRows.length).toBe(2);
    expect(tableRows[0].textContent).toContain('John');
    expect(tableRows[0].textContent).toContain('Doe');
    expect(tableRows[0].textContent).toContain('john@example.com');
    expect(tableRows[1].textContent).toContain('Jane');
  });

  it('should call deleteCustomerById and refresh list when deleteCustomer is called with valid id', () => {
    component.deleteCustomer(1);
    
    expect(customerServiceSpy.deleteCustomerById).toHaveBeenCalledWith(1);
    expect(customerServiceSpy.getCustomers).toHaveBeenCalledTimes(2); // Una en init y otra después de eliminar
  });

  it('should not call deleteCustomerById when deleteCustomer is called with undefined id', () => {
    component.deleteCustomer(undefined);
    
    expect(customerServiceSpy.deleteCustomerById).not.toHaveBeenCalled();
  });
});
