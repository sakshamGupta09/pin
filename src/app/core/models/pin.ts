import { ICustomer } from './customer';

type privacyTypes = 'public' | 'private';

export interface IPin {
  title: string;
  image: string;
  customers: ICustomer[];
  privacy: privacyTypes;
}
