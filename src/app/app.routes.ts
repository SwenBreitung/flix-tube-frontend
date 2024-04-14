import { Routes,RouterModule  } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthComponent } from './auth/auth.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { RegisterComponent } from './auth/register/register.component';
import { ImpressumComponent } from './ui-components/impressum/impressum.component';
import { PrivacyComponent } from './ui-components/privacy/privacy.component';
import path from 'path';
export const routes: Routes = [
    {path: 'main', component: MainComponent },
    { path: '', component: AuthComponent, children: [
        { path: '', component: LogInComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'login', component: LogInComponent },
      ]
    },
    {path: 'impressum', component: ImpressumComponent },
    {path: 'privacy', component: PrivacyComponent },
];
