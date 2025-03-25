import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CountryModel } from '../interfaces/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  // Todo: Move to env file.
  private apiUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<CountryModel[]> {
    return this.http.get<CountryModel[]>(`${this.apiUrl}/all`);
  }
}
