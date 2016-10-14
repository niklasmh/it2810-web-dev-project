import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { HttpModule } from "@angular/http";
import { ContentContainerComponent } from './components/content/content-container.component';
import { ListeContainerComponent } from "./components/liste/liste-container.component";
import { KartContainerComponent } from "./components/kart/kart-container.component";
import { HeaderComponent } from "./components/header/header.component";
<<<<<<< HEAD
import { ButtonsComponent } from "./components/buttons/buttons.component";
=======
import { ListeSearchComponent } from "./components/liste/liste-search.component";
>>>>>>> a2aeb357e372e3eb04bd1558da6dac5a61cb1a23


@NgModule({
  imports:      [ BrowserModule, HttpModule ],
<<<<<<< HEAD
  declarations: [ AppComponent, ContentContainerComponent, KartContainerComponent, ListeContainerComponent, HeaderComponent, ButtonsComponent],
=======
  declarations: [ AppComponent, ContentContainerComponent, ListeContainerComponent, HeaderComponent, ListeSearchComponent],
>>>>>>> a2aeb357e372e3eb04bd1558da6dac5a61cb1a23
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
