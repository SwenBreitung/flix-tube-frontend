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


  searchResults: any[] = [];
  searchResultsMain = [];
  inputFocused = false;
  constructor(
    public backendService: BackendService,
  ) { }



  async onInputChange(event: Event): Promise<void> {
    if (event.target instanceof HTMLInputElement) {
      const input = event.target;
      const inputValue = input.value;

      if (inputValue.length === 0) {
        this.searchResults = [];  // Leere Ergebnisse, wenn das Input-Feld leer ist
      } else {
        try {
          // Warte auf die Ergebnisse von loadSearchData
          const results = await this.backendService.loadSearchData(inputValue);
          this.searchResults = results;  // Die Suchergebnisse zuweisen
        } catch (error) {
          console.error('Fehler beim Laden der Suchergebnisse:', error);
        }
      }
    }
  }
}
