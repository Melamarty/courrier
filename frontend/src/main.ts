import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { NgZone } from '@angular/core';
import { routes } from './app/app.routes';
import "zone.js"


bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    {
      provide: NgZone,
      useFactory: () => new NgZone({ enableLongStackTrace: false, shouldCoalesceEventChangeDetection: false })
    }
  ],
  // no `ngZone` option here; Angular 16 removed it from ApplicationConfig
});
