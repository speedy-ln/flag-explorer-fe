import {Component, effect, inject, signal} from '@angular/core';
import {ToolBarComponent} from '../../component/tool-bar/tool-bar.component';
import {CountryCardComponent} from '../../component/country-card/country-card.component';
import {NgFor, NgIf} from '@angular/common';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {CountryService} from '../../shared/services/country.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {debounceTime, Subject} from 'rxjs';
import {useSearchablePaginatedList} from '../../shared/utils/use-search-pagination';
import {Router} from '@angular/router';
import {Country} from '../../shared/models/country.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ToolBarComponent, CountryCardComponent, NgFor, NgIf, MatPaginatorModule, MatProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private countryService = inject(CountryService);
  private router = inject(Router);
  private searchInputSubject = new Subject<string>();
  readonly isLoading = signal(true);


  readonly countries = toSignal(
    this.countryService.getAllCountries(),
    { initialValue: [] }
  );

  readonly listUtils = useSearchablePaginatedList(() => this.countries(), {
    pageSize: 10,
    searchFn: (country, term) => {
      const name = country.name.common.toLowerCase();
      const capital = (country.capital?.[0] || '').toLowerCase();
      return name.includes(term) || capital.includes(term);
    }
  });

  constructor() {
    effect(() => {
      if (this.countries().length) {
        this.isLoading.set(false);
      }
    });

    this.searchInputSubject.pipe(
      debounceTime(300)
    ).subscribe((term) => {
      this.listUtils.setSearchTerm(term);
    });
  }

  onSearchChanged(term: string) {
    this.listUtils.setSearchTerm(term);
  }

  onPageChange(event: PageEvent) {
    this.listUtils.setPage(event.pageIndex, event.pageSize);
  }

  goToDetails(country: Country): void {
    this.router.navigate(['/country', country.name.common]);
  }
}
