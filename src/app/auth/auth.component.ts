import { Component } from '@angular/core';
import { AuthService } from './../service/auth.service';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './../main/header/header.component';
import { AuthFooterComponent } from './../ui-components/auth-footer/auth-footer.component'
import { AuthHeaderComponent } from "../ui-components/auth-header/auth-header.component";
import { UniversalCardComponent } from "../ui-components/universal-card/universal-card.component";
@Component({
    selector: 'app-auth',
    standalone: true,
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss',
    imports: [RouterModule, HeaderComponent, AuthFooterComponent, AuthHeaderComponent, UniversalCardComponent]
})
export class AuthComponent {
  constructor(
    public authService: AuthService,
    ){}
}
