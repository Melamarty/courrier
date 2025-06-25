import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { App } from './app';

@NgModule({
  declarations: [
    // Your components
  ],
  imports: [
    HttpClientModule, // Import HttpClientModule here
  ],
  providers: [],
  //bootstrap: [App],
})
export class AppModule {}