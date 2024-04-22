import { Routes,RouterModule  } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthComponent } from './auth/auth.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { RegisterComponent } from './auth/register/register.component';
import { ImpressumComponent } from './ui-components/impressum/impressum.component';
import { PrivacyComponent } from './ui-components/privacy/privacy.component';
// import path from 'path';
import { VideoUploadComponent } from './main/content/video-upload/video-upload.component';
import { StartPageComponent } from './main/content/start-page/start-page.component';
import { UpNextVideosComponent } from './main/content/up-next-videos/up-next-videos.component';


export const routes: Routes = [
    { path: 'main', component: MainComponent , children: [
    { path: '', component: StartPageComponent },
    { path: 'upload', component: VideoUploadComponent },
    { path: 'start-page', component: StartPageComponent },
    { path: 'test', component: UpNextVideosComponent },
    ]
    // {
    //   path: 'main',
    //   component: MainComponent,
    //   children: [
    //     {
    //       path: '',
    //       pathMatch: 'full',
    //       loadComponent: () => import('./main/content/start-page/start-page.component').then(m => m.StartPageComponent)
    //     },
    //     {
    //       path: 'upload',
    //       loadComponent: () => import('./main/content/video-upload/video-upload.component').then(m => m.VideoUploadComponent)
    //     },
    //     {
    //       path: 'start-page',
    //       loadComponent: () => import('./main/content/start-page/start-page.component').then(m => m.StartPageComponent)
    //     },
    //     // {
    //     //   path: 'test',
    //     //   loadComponent: () => import('./up-next-videos.component').then(m => m.UpNextVideosComponent)
    //     // }
    //   ]
    
  },

    { path: '', component: AuthComponent, children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LogInComponent },
      { path: '', component: LogInComponent },
      ]
    },
    {path: 'impressum', component: ImpressumComponent },
    {path: 'privacy', component: PrivacyComponent },
];
