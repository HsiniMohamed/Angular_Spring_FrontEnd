import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { NewCustomerComponent } from './components/new-customer/new-customer.component';
import { CustomerAccountsComponent } from './components/customer-accounts/customer-accounts.component';
import { LoginComponent } from './components/login/login.component';
import { AdminTemplateComponent } from './components/admin-template/admin-template.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AutorizationGuard } from './guards/autorization.guard';
import { NotAutorizedComponent } from './components/not-autorized/not-autorized.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminTemplateComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'customers', component: CustomersComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: 'accounts/customer/:id', component: AccountsComponent },
      {
        path: 'new-customer',
        component: NewCustomerComponent,
        canActivate: [AutorizationGuard],
        data: { role: 'ADMIN' },
      },
      { path: 'customer-accounts/:id', component: CustomerAccountsComponent },
      { path: 'notAutorized', component: NotAutorizedComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
