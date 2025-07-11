import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { App } from './app';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Create } from './pages/create/create';
import { Topbar } from './components/topbar/topbar';
import { Sidebar } from './components/sidebar/sidebar';
import { routes } from './app.routes';

@NgModule({
  declarations: [
  ],
  imports: [
    HttpClientModule,
    RouterModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  //bootstrap: [App],
})
export class AppModule {}