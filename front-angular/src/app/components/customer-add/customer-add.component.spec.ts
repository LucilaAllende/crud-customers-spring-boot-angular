import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddComponent } from './customer-add.component';
import { CustomerService } from '../../service/customer.service';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../class/customer';
import { of } from 'rxjs';

describe('CustomerAddComponent', () => {
  let component: CustomerAddComponent;
  let fixture: ComponentFixture<CustomerAddComponent>;
  let customerServiceSpy: jasmine.SpyObj<CustomerService>;

  beforeEach(async () => {
    customerServiceSpy = jasmine.createSpyObj('CustomerService', ['createCustomer']);

    await TestBed.configureTestingModule({
      imports: [CustomerAddComponent, FormsModule],
      providers: [{ provide: CustomerService, useValue: customerServiceSpy }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createCustomer when the form is submitted', () => {
    const mockCustomer = new Customer('John', 'Doe', 'john@example.com');
    
    customerServiceSpy.createCustomer.and.returnValue(of(mockCustomer));
    
    // Asignamos valores a las propiedades del componente
    component.firstName = 'John';
    component.lastName = 'Doe';
    component.email = 'john@example.com';
    
    // Disparamos el método createCustomer
    component.createCustomer();
    
    // Comprobamos que el método createCustomer del servicio ha sido llamado con el customer adecuado
    expect(customerServiceSpy.createCustomer).toHaveBeenCalledWith(mockCustomer);
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
    expect(component.firstName).toBe('John');
    expect(component.lastName).toBe('Doe');
    expect(component.email).toBe('john@example.com');
  });
});
