import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryDetailComponent } from './country-detail.component';
import {Country} from '../../shared/models/country.model';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {CountryService} from '../../shared/services/country.service';

describe('CountryDetailComponent', () => {
  let component: CountryDetailComponent;
  let fixture: ComponentFixture<CountryDetailComponent>;

  const mockCountries: Country[] = [
    {
      name: { common: 'South Africa' },
      capital: ['Pretoria'],
      flags: { png: 'flag.png' },
      population: 60000000
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => 'South Africa' })
          }
        },
        {
          provide: CountryService,
          useValue: {
            getAllCountries: () => of(mockCountries)
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays country details', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('South Africa');
    expect(compiled.textContent).toContain('Pretoria');
    expect(compiled.textContent).toContain('60,000,000');
  });
});
