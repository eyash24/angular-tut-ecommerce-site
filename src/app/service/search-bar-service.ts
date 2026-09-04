import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchBarService {
  overlayOpen = signal(false);
  // recentSearches = signal<string[]>(['watch', 'headphone', 'pillow', 'running shoe', 'yoga mat'])
  recentSearches = signal<string[]>(JSON.parse(window.localStorage.getItem('recentSearches') ?? '[]'))

  searchTerm = signal('');

  constructor(){

  }

  search(searchTerm: string) {
    // perform Search
    this.searchTerm.set(searchTerm);
    this.overlayOpen.set(false);
    this.addToRecentSearches(searchTerm);

  }

  addToRecentSearches(searchTerm: string) {
    const lowerCaseTerm = searchTerm.toLowerCase();
    this.recentSearches.set([
      lowerCaseTerm,
      ...this.recentSearches().filter((s) => s !== lowerCaseTerm)
    ]);
  }

  deleteFromRecentSearches(searchTerm: string) {
    this.recentSearches.set(this.recentSearches().filter(s => s !== searchTerm))
  }

  saveLocalStorage = effect(() => {
    window.localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches()))
  })

  clearSearch() {
    this.searchTerm.set('');
    this.overlayOpen.set(true);
  }
}
