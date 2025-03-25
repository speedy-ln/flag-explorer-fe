import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCardComponent } from './country-card.component';
import {Country} from '../../shared/models/country.model';
import {By} from '@angular/platform-browser';

describe('CountryCardComponent', () => {
  let component: CountryCardComponent;
  let fixture: ComponentFixture<CountryCardComponent>;

  const mockCountry: Country = {
    name: { common: 'South Africa' },
    capital: ['Pretoria'],
    flags: { png: 'https://flag.url' },
    population: 60000000
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryCardComponent);
    component = fixture.componentInstance;
    component.country = mockCountry;
    fixture.detectChanges();
  });

  it('displays country name and capital', () => {
    const title = fixture.debugElement.query(By.css('mat-card-title')).nativeElement;
    const subtitle = fixture.debugElement.query(By.css('mat-card-subtitle')).nativeElement;

    expect(title.textContent).toContain('South Africa');
    expect(subtitle.textContent).toContain('Pretoria');
  });

  it('emits viewMore on button click', () => {
    spyOn(component.viewMore, 'emit');
    const button = fixture.debugElement.query(By.css('mat-card')).nativeElement;
    button.click();
    expect(component.viewMore.emit).toHaveBeenCalled();
  });
});
