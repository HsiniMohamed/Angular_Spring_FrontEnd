import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { CustomerAccounts } from 'src/app/models/customerAccount.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css'],
})
export class CustomerAccountsComponent implements OnInit {
  customerId!: number;
  customer!: Customer;
  customerAccountsObservable!: Observable<Array<CustomerAccounts>>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {
    this.customer = this.router.getCurrentNavigation()?.extras
      .state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.customerAccountsObservable = this.accountService.getAccountsByCustomer(
      this.customerId
    );
  }
  goToAccountOperations(accountId: string) {
    console.log(accountId);

    this.router.navigateByUrl('accounts/customer/' + accountId);
  }
}
