import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {
    transform(list, search): any {
        let filteredList = [];
        for (let key in list) {
            if (list[key].Name.indexOf(search) !== -1)
                filteredList.push(list[key])
        }
        return filteredList;
    }
}
