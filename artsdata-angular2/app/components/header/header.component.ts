import { Component, Output, EventEmitter } from '@angular/core';

@Component ({
  moduleId: module.id,
  selector: 'header',
  templateUrl: 'header.component.html'
})

export class HeaderComponent {
  @Output() toggleChange = new EventEmitter();

  clicked(){
    this.toggleChange.emit()
  }
}
