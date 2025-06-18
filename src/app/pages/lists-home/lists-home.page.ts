import { Component, OnInit } from '@angular/core';
import { IListItem } from 'src/app/models/i-list-item';
import { List } from 'src/app/models/list';

@Component({
  selector: 'app-lists-home',
  templateUrl: './lists-home.page.html',
  styleUrls: ['./lists-home.page.scss'],
})
export class ListsHomePage implements OnInit {
  title: string;
  listsList: List[];

  constructor() {}

  ngOnInit() {
    this.title = 'Lists';
  }

  onNewListClicked() {
    console.log('New List Clicked!');
  }
}
