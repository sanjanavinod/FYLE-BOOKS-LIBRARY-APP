import { Component,OnInit } from '@angular/core';
import { GlobalComponent } from '../global-component';



@Component({
  selector: 'app-booksearch',
  templateUrl: './booksearch.component.html',
  styleUrls: ['./booksearch.component.css']
})
export class BooksearchComponent{
  inp: string = ""
  constructor(public globalComponent: GlobalComponent){

  }
  searchByAuthor() {
    this.globalComponent.get_link = "https://openlibrary.org/search.json?author="+this.inp.trim()
  }
  searchByBook() {
    this.globalComponent.get_link = "https://openlibrary.org/search.json?q="+this.inp.trim()
  }
}
