import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../class/customer';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  imports: [FormsModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent implements OnInit {
  
  customer: Customer = new Customer('', '', '');
  isEditMode = false;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.customerService.getCustomerById(id).subscribe(data => {
        this.customer = data;
      });
    }
  }

  createCustomer(): void {
    this.customerService.createCustomer(this.customer).subscribe(
      data => {
        console.log('res',data);
      }
    );
  }

  updateCustomer(): void {
    this.customerService.updateCustomer(this.customer).subscribe(
      data => {
        console.log('res',data);
      }
    );
  }

  onSubmit() {
    if (this.isEditMode) {
      this.updateCustomer();
    } else {
      this.createCustomer();
    }
  }

}
