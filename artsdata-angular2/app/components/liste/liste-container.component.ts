import { Component, Input, ChangeDetectorRef } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'liste-container',
  templateUrl: 'liste-container.component.html'
})

export class ListeContainerComponent {
  @Input() searchFilter;
  data: any;
  dataValues: any = [];

  constructor(private http: Http) {
    this.data = this.getData();
    console.log(this.dataValues);
  }

  getData() {
    this.http.get('http://artskart2.artsdatabanken.no/api/observations/list?Taxons=31133,31140,31237,31267,31292&pageSize=50')
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
