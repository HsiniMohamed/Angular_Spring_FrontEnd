import { Customer } from './customer.model';

export interface CustomerAccounts {
  id: string;
  dateCreation: Date;
  balance: number;
  currency: string;
  status: string;
  type: string;
  customerDTO: Customer;
  overdraft: number;
  interstRate: number;
}
