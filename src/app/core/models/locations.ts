export type RegionWiseCountries = Record<string, string[]>;

export interface ILocationsResponse {
  data: Record<string, { country: string; region: string }>;
}
