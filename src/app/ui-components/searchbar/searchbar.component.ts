import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendService } from '../../service/backend.service';
import { __await } from 'tslib';


@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})


export class SearchbarComponent {


  searchResults: any = {}; 
  searchResultsMain = [];
  inputFocused = false;
  constructor(
    public backendService: BackendService,
  ) { }


  /**
 * Handles the input change event, triggering a search operation when the input is not empty.
 * If the input is empty, it clears the search results. Otherwise, it fetches search results
 * from the backend and updates the relevant data.
 */
  async onInputChange(event: Event): Promise<void> {
    if (event.target instanceof HTMLInputElement) {
      const input = event.target;
      const inputValue = input.value;

      if (inputValue.length === 0) {
        this.backendService.searchResults = [];
      } else {
        try {
          const results = await this.backendService.loadSearchData(inputValue);
          this.searchResults = results;
          this.backendService.searchResults = this.searchResults.results;
          console.log( this.backendService.searchResults,'backend')
        } catch (error) {
          console.error('Fehler beim Laden der Suchergebnisse:', error);
        }
      }
    }
  }
}
