import { Component, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider'
import { MatListModule } from '@angular/material/list';
import { SearchBarService } from '../../service/search-bar-service';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-search-overlay',
  imports: [MatDivider, MatListModule, MatIcon, MatIconButton],
  templateUrl: './search-overlay.html',
  styleUrl: './search-overlay.scss',
})
export class SearchOverlay {

  searchBarService = inject(SearchBarService);
  recentSearches = this.searchBarService.recentSearches;

  deleteRecentSearch(searchTerm: string) {
    this.searchBarService.deleteFromRecentSearches(searchTerm);
  }

  perforomSearch(searchTerm: string ){
    this.searchBarService.search(searchTerm);

  }
}
