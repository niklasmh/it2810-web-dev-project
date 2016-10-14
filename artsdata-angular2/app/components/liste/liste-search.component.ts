import { Component } from "@angular/core";

@Component ({
  moduleId: module.id,
  selector: 'liste-search',
  templateUrl: 'liste-search.component.html'
})


export class ListeSearchComponent {
  searchFil: string = '';

  onChangeHandeler(value){
    this.searchFil = event.target.value;
    console.log(this.searchFil);
  }


}
