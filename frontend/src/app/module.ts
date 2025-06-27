import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { App } from './app';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
  ],
  imports: [
    HttpClientModule, // Import HttpClientModule here
    RouterModule
  ],
  providers: [],
  //bootstrap: [App],
})
export class AppModule {}