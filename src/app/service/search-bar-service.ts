import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchBarService {
  overlayOpen = signal(false);
  recentSearches = signal<string[]>(['watch', 'headphone', 'pillow', 'running shoe', 'yoga mat'])


}
