import {Component} from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'liste-container',
  templateUrl: 'liste-container.component.html'
})

export class ListeContainerComponent {
  searchFilter: string = '';
  data: Observable<any>;

  // constructor(private http: Http) {
  //   this.data = this.fetchHandler();
  //   console.log(this.data)
  // }
  //
  // fetchHandler() {
  //   return this.http.request('http://artskart2.artsdatabanken.no/api/observations/list?Taxons=31113,77987&pageSize=50')
  //   .map(res => res.json());
  // }



}
