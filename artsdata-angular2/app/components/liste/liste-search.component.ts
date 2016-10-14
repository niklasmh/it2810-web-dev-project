import { Component, Output, EventEmitter } from "@angular/core";

@Component ({
  moduleId: module.id,
  selector: 'liste-search',
  templateUrl: 'liste-search.component.html'
})


export class ListeSearchComponent {
  @Output() searchField = new EventEmitter<string>();

  onChangeHandeler(value){
    this.searchField = event.target.value;
  }
}
