import { Routes } from '@angular/router';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerAddComponent } from './components/customer-add/customer-add.component';

export const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent,
  },
  {
    path: 'customers/add',
    component: CustomerAddComponent,
  },
];
