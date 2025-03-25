import { TestBed } from '@angular/core/testing';

import { CountryService } from './country.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('CountryService', () => {
  let service: CountryService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountryService]
    });
    service = TestBed.inject(CountryService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fetches countries from API', () => {
    service.getAllCountries().subscribe(data => {
      expect(data.length).toBe(1);
      expect(data[0].name.common).toBe('Test Country');
    });

    const req = http.expectOne('https://restcountries.com/v3.1/all');
    expect(req.request.method).toBe('GET');
    req.flush([{ name: { common: 'Test Country' }, flags: { png: '' }, population: 0 }]);
  });
});
