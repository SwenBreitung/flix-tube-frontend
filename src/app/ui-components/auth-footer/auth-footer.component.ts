import { Component } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";


@Component({
  selector: 'app-auth-footer',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './auth-footer.component.html',
  styleUrl: './auth-footer.component.scss'
})
export class AuthFooterComponent {

}
