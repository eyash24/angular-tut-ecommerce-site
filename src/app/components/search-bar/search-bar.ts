import { SearchBarService } from './../../service/search-bar-service';
import { OverlayModule } from '@angular/cdk/overlay';
import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SearchOverlay } from '../search-overlay/search-overlay';



@Component({
  selector: 'app-search-bar',
  imports: [MatIconButton, MatIcon, OverlayModule, SearchOverlay],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar {
  searchBarService = inject(SearchBarService)
  overlayOpen = this.searchBarService.overlayOpen;
}
