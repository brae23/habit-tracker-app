import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListItem } from 'src/app/interfaces/list-item';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent  implements OnInit {

  @Input() listItem: ListItem;
  @Output() listItemClicked: EventEmitter<ListItem>;

  constructor() { }

  ngOnInit() {}

  onListItemClickedEvent(listItem: ListItem) {
    this.listItemClicked.emit(listItem);
  }
}
