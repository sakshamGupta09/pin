import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ILocationsResponse } from '../../core/models/locations';
import { catchError, of } from 'rxjs';
import { LOCATION_DATA } from '../../constants/location-data';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private http = inject(HttpClient);

  readonly API_URL = 'https://api.first.org/data/v1/countries';

  public getLocations() {
    return this.http
      .get<ILocationsResponse>(this.API_URL, {
        params: {
          limit: 249,
          offset: 0,
          access: 'public',
        },
      })
      .pipe(catchError(() => of(LOCATION_DATA)));
  }
}
