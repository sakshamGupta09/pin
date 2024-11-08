type privacyTypes = 'public' | 'private';

export interface IPin {
  title: string;
  image: string;
  customers: string[];
  privacy: privacyTypes;
}
