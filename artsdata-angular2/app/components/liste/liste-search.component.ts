import { Component, Output, EventEmitter } from "@angular/core";

@Component ({
  moduleId: module.id,
  selector: 'liste-search',
  templateUrl: 'liste-search.component.html'
})

export class ListeSearchComponent {
  @Output() searchField = new EventEmitter();

  ngOnInit () {
    this.searchField.emit('');
  }

  onChangeHandler(value){
    this.searchField.emit();
  }
}
