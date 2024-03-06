import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { AccountDetails } from 'src/app/models/account.model';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  searchAccountFormGroup!: FormGroup;
  operationsFormGroup!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 5;
  accountObservable!: Observable<AccountDetails>;
  accountId = null;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private route: ActivatedRoute,
    public authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.accountId = this.route.snapshot.params['id'];
    if (this.accountId) {
      this.handleSearchAccount();
    }
    this.searchAccountFormGroup = this.fb.group({
      accountId: this.fb.control(''),
    });
    this.operationsFormGroup = this.fb.group({
      operationType: [''],
      description: [''],
      amount: [0],
      accountDestination: [null],
    });
  }
  handleSearchAccount() {
    let id: string;
    if (this.accountId) {
      id = this.accountId;
    } else {
      id = this.searchAccountFormGroup.value.accountId;
    }
    this.accountObservable = this.accountService.getAccount(
      id,
      this.currentPage,
      this.pageSize
    );
  }
  goToPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }
  handleAccountOperation() {
    let accountId: string;
    if (this.accountId) {
      accountId = this.accountId;
    } else {
      accountId = this.searchAccountFormGroup.value.accountId;
    }

    let accountDestination: string =
      this.operationsFormGroup.value.accountDestination;
    let operationType = this.operationsFormGroup.value.operationType;
    let amount = this.operationsFormGroup.value.amount;
    let description = this.operationsFormGroup.value.description;
    if (operationType == 'DEBIT') {
      this.accountService.debit(accountId, amount, description).subscribe({
        next: (data) => {
          alert(' SUCCESS DEBIT !');
          this.handleSearchAccount();
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else if (operationType == 'CREDIT') {
      this.accountService.credit(accountId, amount, description).subscribe({
        next: (data) => {
          alert(' SUCCESS CREDIT !');
          this.handleSearchAccount();
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else if (operationType == 'TRANSFER') {
      this.accountService
        .tranfer(accountId, accountDestination, amount)
        .subscribe({
          next: (data) => {
            alert(' SUCCESS TRANSFER !');
            this.handleSearchAccount();
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
    this.operationsFormGroup.reset();
  }
}
