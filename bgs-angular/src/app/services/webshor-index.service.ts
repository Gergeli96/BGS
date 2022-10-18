import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class WebshopIndexService {
    public selectedCategory = new BehaviorSubject<number>(0)

}
