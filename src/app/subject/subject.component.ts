import { Component } from '@angular/core';
import { BooksearchComponent } from '../booksearch/booksearch.component';
import { GlobalComponent } from '../global-component';
// import{ GlobalComponent } from './global-component';
 

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css',]
})
export class SubjectComponent {
  inp: string=""
  constructor(public globalComponent: GlobalComponent){
    
  }
  callsubject(sub:string) {
    this.globalComponent.get_link='https://openlibrary.org/subjects/'+ sub +'.json'
  }
  
  searchBySubject(){
    this.globalComponent.get_link = "https://openlibrary.org/search.json?q="+this.inp.trim()
  }
}
