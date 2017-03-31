"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Rx_1 = require("rxjs/Rx");
var core_1 = require("@angular/core");
var EventService = (function () {
    function EventService() {
        this.bus = new Rx_1.Subject();
    }
    EventService.prototype.publish = function (key, data) {
        this.bus.next({ key: key, data: data });
    };
    EventService.prototype.subscribe = function (key, subscriber) {
        return this.bus.asObservable()
            .filter(function (event) { return event.key === key; })
            .map(function (event) { return event.data; })
            .subscribe(subscriber);
    };
    EventService.prototype.subscribeNext = function (key, next) {
        return this.bus.asObservable()
            .filter(function (event) { return event.key === key; })
            .map(function (event) { return event.data; })
            .subscribe(next, null, null);
    };
    EventService = __decorate([
        core_1.Injectable()
    ], EventService);
    return EventService;
}());
exports.EventService = EventService;
