import { Component } from '@angular/core';
import './rxjs-operators';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  toggle: boolean = true;

  toggleEvent() {
    if (this.toggle) {
      this.toggle = false;

    } else {
      this.toggle = true;
    }
  }
}