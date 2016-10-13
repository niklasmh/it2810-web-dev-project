import { Component, Input } from '@angular/core';

@Component ({
  moduleId: module.id,
  selector: 'buttons',
  templateUrl: 'buttons.component.html'
})

export class ButtonsComponent {
  @Input() buttonTxt: string;

}
