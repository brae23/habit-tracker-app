import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IListItem } from 'src/app/models/i-list-item';
import { TaskList } from 'src/app/models/task-list';

@Component({
  selector: 'app-inset-list',
  templateUrl: './inset-list.component.html',
  styleUrls: ['./inset-list.component.scss'],
})
export class InsetListComponent implements OnInit {

  @Input() taskList: any;
  @Output() listItemClicked: EventEmitter<any> = new EventEmitter<any>;

  isListClosed: boolean = true;

  constructor() { }

  ngOnInit() {}

  listItemClickedEvent(listItem: IListItem) {
    listItem.completed = !listItem.completed;
    if (listItem.completed) {
      this.taskList.completedTaskCount ++;
    }
    else {
      this.taskList.completedTaskCount --;
    }
    this.listItemClicked.emit(listItem);
  }

  onListClicked(currentVal: boolean) {
    this.isListClosed = !currentVal;
  }
}
