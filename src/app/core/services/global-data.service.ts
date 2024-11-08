import { Injectable, signal } from '@angular/core';
import { ICustomer } from '../models/customer';
import { IPin } from '../models/pin';

@Injectable({
  providedIn: 'root',
})
export class GlobalDataService {
  private customers = signal<ICustomer[]>([]);

  private pins = signal<IPin[]>([]);

  readonly CUSTOMERS_STORAGE_KEY = 'customers';

  readonly PINS_STORAGE_KEY = 'pins';

  constructor() {
    this.initCustomersFromStorage();
    this.initPinsFromStorage();
  }

  public getCustomers() {
    return this.customers.asReadonly();
  }

  public getPins() {
    return this.pins.asReadonly();
  }

  private initCustomersFromStorage() {
    const customersData = localStorage.getItem(this.CUSTOMERS_STORAGE_KEY);
    if (customersData) {
      this.customers.set(JSON.parse(customersData));
    }
  }

  private initPinsFromStorage() {
    const pinsData = localStorage.getItem(this.PINS_STORAGE_KEY);
    if (pinsData) {
      this.pins.set(JSON.parse(pinsData));
    }
  }

  public addCustomer(customer: ICustomer) {
    const customers = [...this.customers(), customer];

    this.customers.set(customers);
    localStorage.setItem(this.CUSTOMERS_STORAGE_KEY, JSON.stringify(customers));
  }

  public addPin(pin: IPin) {
    const pins = [...this.pins(), pin];

    this.pins.set(pins);
    localStorage.setItem(this.CUSTOMERS_STORAGE_KEY, JSON.stringify(pins));
  }
}
