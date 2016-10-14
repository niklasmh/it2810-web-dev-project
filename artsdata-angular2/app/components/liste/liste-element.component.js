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
var ListeElementComponent = (function () {
    function ListeElementComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ListeElementComponent.prototype, "name", void 0);
    ListeElementComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'liste-element',
            templateUrl: 'liste-element.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ListeElementComponent);
    return ListeElementComponent;
}());
exports.ListeElementComponent = ListeElementComponent;
//# sourceMappingURL=liste-element.component.js.map