import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { StartPageComponent } from './main/content/start-page/start-page.component';
import { VideoUploadComponent } from './main/content/video-upload/video-upload.component';
import { ImpressumComponent } from './ui-components/impressum/impressum.component';
import { PrivacyComponent } from './ui-components/privacy/privacy.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthComponent } from './auth/auth.component';
import { VideoPageComponent } from './main/content/video-page/video-page.component';


export const routes: Routes = [
    { path: 'main', component: MainComponent , children: [
        { path: '', component: StartPageComponent },
        { path: 'upload', component: VideoUploadComponent },
        { path: 'start-page', component: StartPageComponent },
        // { path: 'video-page', component: VideoPageComponent },
        {
          path: 'video/:id',
          component: VideoPageComponent,
        },
        
        ],
    },   
    { path: '', component: AuthComponent, children: [
        { path: 'register', component: RegisterComponent },
        { path: 'login', component: LogInComponent },
        { path: '', component: LogInComponent },
        ]
      },
      {path: 'impressum', component: ImpressumComponent },
      {path: 'privacy', component: PrivacyComponent },
    // {
    //     path: '',
    //     pathMatch: 'full',
    //     redirectTo: 'main'  // Dies leitet die leere Route auf '/main' um
    // },
    ];

