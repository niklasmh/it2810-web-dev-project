import { Component, Input } from "@angular/core";

@Component({
  moduleId: module.id,
  selector: 'liste-element',
  templateUrl: 'liste-element.component.html'
})

export class ListeElementComponent {
  @Input() name:string;
  items: any = [];
}
