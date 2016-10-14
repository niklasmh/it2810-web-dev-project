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
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var http_1 = require("@angular/http");
var content_container_component_1 = require('./components/content/content-container.component');
var liste_container_component_1 = require("./components/liste/liste-container.component");
var kart_container_component_1 = require("./components/kart/kart-container.component");
var header_component_1 = require("./components/header/header.component");
var buttons_component_1 = require("./components/buttons/buttons.component");
var liste_search_component_1 = require("./components/liste/liste-search.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule],
            declarations: [app_component_1.AppComponent, content_container_component_1.ContentContainerComponent, kart_container_component_1.KartContainerComponent, liste_container_component_1.ListeContainerComponent, header_component_1.HeaderComponent, buttons_component_1.ButtonsComponent, liste_search_component_1.ListeSearchComponent],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map