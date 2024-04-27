
import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'; 
import { LayoutService } from './../../service/layout.service';
import { LogoComponent } from "../../ui-components/logo/logo.component";
import { SearchbarComponent } from "../../ui-components/searchbar/searchbar.component";
// import { SearchbarComponent } from "../../ui-components/searchbar/searchbar.component";
// import { LogoComponent } from "../../ui-components/logo/logo.component";
@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [
        LogoComponent,
        SearchbarComponent,
        MatIconModule
    ]
})
export class HeaderComponent {
  constructor(
    public layoutService: LayoutService

  ) {}

  HoverUploadText: boolean = false;
}
