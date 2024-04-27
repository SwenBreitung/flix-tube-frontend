import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})


export class SearchbarComponent {


  searchResults = [];
  searchResultsMain = []; 
  inputFocused = false;

  async onInputChange(event: Event, number:number): Promise<void> {

    if (event.target instanceof HTMLInputElement) {
      const input = event.target;
      const inputValue = input.value;
      if (inputValue.length === 0) {
        if(1== number){
          this.searchResults = []; 
        }else{
          this.searchResultsMain = [];       
        }
       
      } else {
        //ind dabubble, dashbord componente falls benötigt. 
        //  await this.search(inputValue, number);

      }
    }
  }
}
