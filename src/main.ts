import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from "@angular/common/http";
import { importProvidersFrom } from '@angular/core';
// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
})