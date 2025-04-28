import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFormComponent } from './customer-form.component';
import { CustomerService } from '../../service/customer.service';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../class/customer';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('CustomerFormComponent', () => {
  let component: CustomerFormComponent;
  let fixture: ComponentFixture<CustomerFormComponent>;
  let customerServiceSpy: jasmine.SpyObj<CustomerService>;
  let activatedRouteMock: any;

  beforeEach(async () => {
    customerServiceSpy = jasmine.createSpyObj('CustomerService', ['createCustomer', 'getCustomerById', 'updateCustomer']);
    activatedRouteMock = { snapshot: { paramMap: { get: jasmine.createSpy() } } };

    await TestBed.configureTestingModule({
      imports: [CustomerFormComponent, FormsModule],
      providers: [
        { provide: CustomerService, useValue: customerServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind form fields to component properties', () => {
    // Verificamos que los valores en el formulario están siendo correctamente ligados a las propiedades del componente
    const firstNameInput = fixture.nativeElement.querySelector('#firstName');
    const lastNameInput = fixture.nativeElement.querySelector('#lastName');
    const emailInput = fixture.nativeElement.querySelector('#email');

    // Simulamos que el usuario ingresa datos en los campos del formulario
    firstNameInput.value = 'John';
    lastNameInput.value = 'Doe';
    emailInput.value = 'john@example.com';

    // Disparamos un evento de cambio para actualizar el binding
    firstNameInput.dispatchEvent(new Event('input'));
    lastNameInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    // Verificamos que las propiedades del componente se han actualizado correctamente
    expect(component.customer.firstName).toBe('John');
    expect(component.customer.lastName).toBe('Doe');
    expect(component.customer.email).toBe('john@example.com');
  });

  it('should set isEditMode to true and load customer on init when id exists', async () => {
    // Simulamos que existe ID
    activatedRouteMock.snapshot.paramMap.get.and.returnValue('123');

    const mockCustomer = new Customer('Jane', 'Doe', 'jane@example.com');
    customerServiceSpy.getCustomerById.and.returnValue(of(mockCustomer));

    // Volvemos a llamar ngOnInit manualmente
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.isEditMode).toBeTrue();
    expect(customerServiceSpy.getCustomerById).toHaveBeenCalledWith('123');
    expect(component.customer.firstName).toBe('Jane');
  });

  it('should call updateCustomer when the form is submitted in edit mode', () => {
    const mockCustomer = new Customer('Jane', 'Doe', 'jane@example.com');
    component.customer = mockCustomer;
    component.isEditMode = true;

    customerServiceSpy.updateCustomer.and.returnValue(of(mockCustomer));

    component.onSubmit();

    expect(customerServiceSpy.updateCustomer).toHaveBeenCalledWith(mockCustomer);
  });

  it('should call createCustomer when the form is submitted in create mode', () => {
    const mockCustomer = new Customer('John', 'Smith', 'johnsmith@example.com');
  
    customerServiceSpy.createCustomer.and.returnValue(of(mockCustomer));
    
    component.customer = mockCustomer;
    component.isEditMode = false;
    
    component.onSubmit();
    
    expect(customerServiceSpy.createCustomer).toHaveBeenCalledWith(mockCustomer);
  });

  it('should display "Actualizar" on button when in edit mode', () => {
    component.isEditMode = true;
    fixture.detectChanges();
    
    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(button.textContent.trim()).toBe('Actualizar');
  });
  
  it('should display "Crear" on button when not in edit mode', () => {
    component.isEditMode = false;
    fixture.detectChanges();
    
    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(button.textContent.trim()).toBe('Crear');
  });
});
