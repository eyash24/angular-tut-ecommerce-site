import { SearchBarService } from './../../service/search-bar-service';
import { OverlayModule } from '@angular/cdk/overlay';
import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SearchOverlay } from '../search-overlay/search-overlay';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-search-bar',
  imports: [MatIconButton, MatIcon, OverlayModule, SearchOverlay, NgClass],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar {
  searchBarService = inject(SearchBarService)
  overlayOpen = this.searchBarService.overlayOpen;

  searchTerm = this.searchBarService.searchTerm

  search(searchTerm: string) {

    if (!searchTerm) return;

    this.searchBarService.search(searchTerm);
  }

  clearSearchfromBar() {
    this.searchBarService.clearSearch()
  }
}
