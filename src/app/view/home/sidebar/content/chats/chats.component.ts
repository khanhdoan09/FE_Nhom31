import { Component, OnInit } from '@angular/core';
// import { Observable, Subject } from 'rxjs';
// import { map, startWith, tap } from 'rxjs/operators';
@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  constructor() {
  }
  // searchText = new Subject<string>();
  // results: Observable<string[]>;
  // notFound = false;
  // data = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight'];
  //
  // constructor() {
  //   this.results = this.searchText.pipe(
  //     startWith(''),
  //     map((value: string) => this.filter(value)),
  //     tap((results: string[]) =>
  //       results.length > 0 ? (this.notFound = false) : (this.notFound = true)
  //     )
  //   );
  // }
  //
  // filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.data.filter((item: string) =>
  //     item.toLowerCase().includes(filterValue)
  //   );
  // }

  ngOnInit(): void {
  }

}
