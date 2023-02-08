import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class GlobalComponent {
    public get_link:string="https://openlibrary.org/search.json?author=tolkien"
}