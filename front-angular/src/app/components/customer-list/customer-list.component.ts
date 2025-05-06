import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { ThemeService } from '../../service/theme.service';
import { CustomerService } from '../../service/customer.service';
import { Customer } from '../../class/customer';

@Component({
  selector: 'app-customer-list',
  imports: [CommonModule, RouterModule],
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
        this.customers = data;
      }
    );
  }

  deleteCustomer(id?: number) {
    if (id === undefined) {
      console.error('Error: ID es undefined');
      return;
    }
    this.customerService.deleteCustomerById(id).subscribe(
      () => {
        this.listCustomers();
      }
    );
  }

}
