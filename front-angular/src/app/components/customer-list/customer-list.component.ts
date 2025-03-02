import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { Customer } from '../../class/customer';

@Component({
  selector: 'app-customer-list',
  imports: [],
  standalone: true,
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {

  customers: Customer[] = [];

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.listCustomers();
  }

  listCustomers() {
    this.customerService.getCustomers().subscribe(
      data => {
        console.log('Customers=', data);
        this.customers = data;
        console.log('Customers=', this.customers);
      }
    );
  }

}
