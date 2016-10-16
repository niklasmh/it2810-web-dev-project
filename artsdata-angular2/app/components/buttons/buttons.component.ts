import { Component, Output, EventEmitter } from '@angular/core';

@Component ({
  moduleId: module.id,
  selector: 'buttons',
  templateUrl: 'buttons.component.html'
})

export class ButtonsComponent {
  @Output() toggleClick = new EventEmitter();
  emittClick(){
    this.toggleClick.emit()
  }
}
