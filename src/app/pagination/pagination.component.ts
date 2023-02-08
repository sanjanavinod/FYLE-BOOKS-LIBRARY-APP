import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { map } from 'rxjs/operators';

interface SearchResult {
  start: number,
  num_found: number,
  docs: []
  works: []
}
interface Book {
  title: string,
  subtitle: string,
  authors: string[],
  first_published: number,
  last_published: number
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges{
  @Input() link1: string;

  books: Book[] = []
  flag = 1;

  page = 1;             //the initial page to display
  collectionSize = 0  //total number of countries in the list
  pageSize = 10;        //size of the first page

  constructor(private httpClient: HttpClient ) {}
  ngOnInit(): void {
    this.loadBooks()
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.flag = 1
    this.loadBooks()
  }
  refreshBooks(){
    this.books = JSON.parse(localStorage.getItem('booksList'))
    .map((book, i) => ({id: i + 1, ...book}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  loadBooks(){
    this.getSubject().subscribe( (x) => {
        if(x) {
          this.flag=0;
        }
        console.log(x)
        this.books = x;
        this.collectionSize = x.length
        localStorage.setItem('booksList', JSON.stringify(x));
        this.refreshBooks(); // Display the first page
    })
  }
  getSubject(): any{
    return this.httpClient.get<SearchResult>(this.link1).pipe(
      map((response) => {
        if(response.docs){

        
        return response.docs.map((e: any) => {
          console.log(e)
          return {
            title: e.title,
            subtitle: (e.subtitle?e.subtitle:""),
            authors: e.author_name,
            first_published: e.first_publish_year,
            last_published: (e.publish_year?e.publish_year[0]:"-")
          }
        })
      }
      else{
        return response.works.map((e: any) => {
          console.log(e)
          return {
            title: e.title,
            subtitle: (e.subtitle?e.subtitle:""),
            authors: e.author_name,
            first_published: e.first_publish_year,
            last_published: (e.publish_year?e.publish_year[0]:"-")
          }
        })
      }
})
)
}

}
