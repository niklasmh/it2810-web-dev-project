"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
//import { FilterPipe } from "../../common/filter.pipe";
var ListeContainerComponent = (function () {
    function ListeContainerComponent(http) {
        this.http = http;
        this.searchFilter = '';
        this.dataValues = [];
        this.filteredDataValues = [];
        this.data = this.getData();
        console.log(this.dataValues);
    }
    ListeContainerComponent.prototype.searchFieldUpdate = function (event) {
        var _this = this;
        this.searchFilter = event.target.value;
        this.filteredDataValues = this.dataValues.filter(function (item) { return item.name.indexOf(_this.searchFilter) !== -1; });
        console.log(this.searchFilter);
    };
    ListeContainerComponent.prototype.getData = function () {
        var _this = this;
        this.http.get('http://artskart2.artsdatabanken.no/api/observations/list?Taxons=31113,77987&pageSize=50')
            .map(function (res) { return res.json(); }).catch(this.handleError).subscribe(function (data) { _this.dataValues = data; }, function (error) { return console.log(error); }, function () { return console.log('done'); });
    };
    ListeContainerComponent.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ListeContainerComponent.prototype, "dataValues", void 0);
    ListeContainerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            //pipes: [ FilterPipe ],
            selector: 'liste-container',
            templateUrl: 'liste-container.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ListeContainerComponent);
    return ListeContainerComponent;
}());
exports.ListeContainerComponent = ListeContainerComponent;
//# sourceMappingURL=liste-container.component.js.map