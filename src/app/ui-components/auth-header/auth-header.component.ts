import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'; 
import { LayoutService } from './../../service/layout.service';
import { SearchbarComponent } from "../../ui-components/searchbar/searchbar.component";
import { LogoComponent } from "../../ui-components/logo/logo.component";
import { LinkButtonComponent } from "../link-button/link-button.component";


@Component({
  selector: 'app-auth-header',
  standalone: true,
  imports: [
    MatIconModule,
    SearchbarComponent,
    LogoComponent,
    LinkButtonComponent
],
  templateUrl: './auth-header.component.html',
  styleUrl: './auth-header.component.scss'
})
export class AuthHeaderComponent {
  constructor(
    public layoutService: LayoutService
) {}

}
