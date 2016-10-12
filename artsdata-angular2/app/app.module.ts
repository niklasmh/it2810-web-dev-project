import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { ContentContainerComponent } from './components/content/content-container.component';
import { ListeContainerComponent } from "./components/liste/liste-container.component";


@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, ContentContainerComponent, ListeContainerComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
