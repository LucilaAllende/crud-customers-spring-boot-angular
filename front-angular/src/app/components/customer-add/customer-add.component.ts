import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../class/customer';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-customer-add',
  imports: [FormsModule],
  templateUrl: './customer-add.component.html',
  styleUrl: './customer-add.component.css'
})
export class CustomerAddComponent implements OnInit {
  
  firstName: string = '';
  lastName: string = '';
  email: string = '';

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
  }

  createCustomer(): void {
    let customer = new Customer(this.firstName, this.lastName, this.email);
    console.log('createCustomer',customer);
    this.customerService.createCustomer(customer).subscribe(
      data => {
        console.log('res',data);
      }
    );
  }

}
