import {Component, Input, ChangeDetectorRef} from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
//import { FilterPipe } from "../../common/filter.pipe";

@Component({
  moduleId: module.id,
  //pipes: [ FilterPipe ],
  selector: 'liste-container',
  templateUrl: 'liste-container.component.html'
})

export class ListeContainerComponent {
  searchFilter: string = '';
  data: any;
  @Input()
  dataValues: any= [];
  filteredDataValues: any = [];

  constructor(private http: Http) {
    this.data = this.getData();
    console.log(this.dataValues);
  }

  searchFieldUpdate(event:any) {
    this.searchFilter = event.target.value;
    this.filteredDataValues = this.dataValues.filter(
      (item) => {return item.name.indexOf(this.searchFilter) !== -1}
    )
    console.log(this.searchFilter);
  }


  getData() {
    this.http.get('http://artskart2.artsdatabanken.no/api/observations/list?Taxons=31113,77987&pageSize=50')
    .map((res) => res.json()).catch(this.handleError).subscribe(
      data => {this.dataValues = data},
      error => console.log(error),
      () => console.log('done')
    );
  }


  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg);
      return Observable.throw(errMsg);
  }


}
