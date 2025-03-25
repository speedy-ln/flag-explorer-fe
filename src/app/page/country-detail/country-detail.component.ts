import {Component, inject} from '@angular/core';
import {NgIf, DecimalPipe, Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {CountryService} from '../../shared/services/country.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {map, switchMap} from 'rxjs';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [NgIf, DecimalPipe],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.css'
})
export class CountryDetailComponent {
  private route = inject(ActivatedRoute);
  private service = inject(CountryService);
  private location = inject(Location);

  readonly country = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => {
        const name = params.get('name');
        return this.service.getAllCountries().pipe(
          map(countries =>
            countries.find(
              c => c.name.common.toLowerCase() === name?.toLowerCase()
            ) || null
          )
        );
      })
    ),
    { initialValue: null }
  );

  goBack() {
    this.location.back();
  }
}
