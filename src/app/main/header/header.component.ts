
import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'; 
import { LayoutService } from './../../service/layout.service';
import { LogoComponent } from "../../ui-components/logo/logo.component";
import { SearchbarComponent } from "../../ui-components/searchbar/searchbar.component";
import { UserImgComponent } from "../../ui-components/user-img/user-img.component";
import { Router } from '@angular/router';
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
    MatIconModule,
    UserImgComponent
]
})
export class HeaderComponent {
  constructor(
    public layoutService: LayoutService,
    public router: Router,
  ) {}

  HoverUploadText: boolean = false;


  /**
 * Navigates the user to the upload page.
 * This method is typically used to load the file upload interface.
 */
  loadUploadFile() {
    this.router.navigate(['main/upload']);
  }
}

