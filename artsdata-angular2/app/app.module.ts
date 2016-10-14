import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { HttpModule } from "@angular/http";
import { ContentContainerComponent } from './components/content/content-container.component';
import { ListeContainerComponent } from "./components/liste/liste-container.component";
import { KartContainerComponent } from "./components/kart/kart-container.component";
import { HeaderComponent } from "./components/header/header.component";
import { ButtonsComponent } from "./components/buttons/buttons.component";
import { ListeSearchComponent } from "./components/liste/liste-search.component";


@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ AppComponent, ContentContainerComponent, KartContainerComponent, ListeContainerComponent, HeaderComponent, ButtonsComponent, ListeSearchComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
