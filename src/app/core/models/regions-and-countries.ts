export type RegionWiseCountries = Record<string, string[]>;

export interface ICountriesResponse {
  data: Record<string, { country: string; region: string }>;
}
