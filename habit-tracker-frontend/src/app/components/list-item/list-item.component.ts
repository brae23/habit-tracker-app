import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {

  @Input() listItem: any;
  @Output() listItemClicked: EventEmitter<any> = new EventEmitter<any>;

  constructor() { }

  ngOnInit() {}

  onListItemClickedEvent(listItem: any) {
    this.listItemClicked.emit(listItem);
  }

  isList(listItem: any) {
    return listItem.hasOwnProperty('listItems');
  }
}
