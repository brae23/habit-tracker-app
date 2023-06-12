import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListItem } from 'src/app/interfaces/list-item';
import { TaskList } from 'src/app/interfaces/task-list';

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

  listItemClickedEvent(listItem: ListItem) {
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
