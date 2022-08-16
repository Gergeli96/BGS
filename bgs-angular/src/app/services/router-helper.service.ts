import { ActivatedRoute, ParamMap } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RouterHelperService {

    constructor() { }


    public getRouteParamsMap(route: ActivatedRoute): ParamMap {
        return this.getFinalRouteConfig(route).snapshot.paramMap
    }

    public getRouteData(route: ActivatedRoute): any {
        return this.getFinalRouteConfig(route).snapshot.data
    }

    private getFinalRouteConfig(route: ActivatedRoute): ActivatedRoute {
        return route.firstChild == null ? route : this.getFinalRouteConfig(route.firstChild)
    }
}
