import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountDetails } from 'src/app/models/account.model';
import { CustomerAccounts } from 'src/app/models/customerAccount.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  public getAccount(
    accountId: string,
    page: number,
    size: number
  ): Observable<AccountDetails> {
    return this.http.get<AccountDetails>(
      environment.backendHost +
        '/accounts/' +
        accountId +
        '/pageOperations?page=' +
        page +
        '&size=' +
        size
    );
  }
  public credit(accountId: string, amount: number, description: string) {
    let data = {
      accountId,
      amount,
      description,
    };
    return this.http.post(environment.backendHost + '/accounts/credit', data);
  }
  public debit(accountId: string, amount: number, description: string) {
    let data = {
      accountId,
      amount,
      description,
    };
    return this.http.post(environment.backendHost + '/accounts/debit', data);
  }
  public tranfer(
    accountIdSoure: string,
    accountIdDestination: string,
    amount: number
  ) {
    let data = {
      accountIdSoure,
      accountIdDestination,
      amount,
    };
    return this.http.post(environment.backendHost + '/accounts/transfer', data);
  }
  public getAccountsByCustomer(
    customerId: number
  ): Observable<Array<CustomerAccounts>> {
    return this.http.get<Array<CustomerAccounts>>(
      environment.backendHost + '/accounts/' + customerId + '/customer'
    );
  }
}
