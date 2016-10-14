import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { HttpModule } from "@angular/http";
import { ContentContainerComponent } from './components/content/content-container.component';
import { ListeContainerComponent } from "./components/liste/liste-container.component";
import { HeaderComponent } from "./components/header/header.component";


@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ AppComponent, ContentContainerComponent, ListeContainerComponent, HeaderComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }