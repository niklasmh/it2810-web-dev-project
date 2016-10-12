import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { ContentContainerComponent } from './components/content/content-container.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, ContentContainerComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
