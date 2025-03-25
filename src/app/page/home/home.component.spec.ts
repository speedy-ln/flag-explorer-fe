import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {Country} from '../../shared/models/country.model';
import {CountryService} from '../../shared/services/country.service';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

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
      imports: [HomeComponent],
      providers: [
        {
          provide: CountryService,
          useValue: {
            getAllCountries: () => of(mockCountries)
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders country cards', () => {
    const card = fixture.debugElement.query(By.css('app-country-card'));
    expect(card).toBeTruthy();
  });
});
