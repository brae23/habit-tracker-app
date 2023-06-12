import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ListItem } from 'src/app/interfaces/list-item';
import { TaskList } from 'src/app/interfaces/task-list';

@Component({
  selector: 'app-daily-task-list',
  templateUrl: './daily-task-list.component.html',
  styleUrls: ['./daily-task-list.component.scss'],
})
export class DailyTaskListComponent  implements OnInit {

  @Input() taskList: TaskList;
  @Output() listItemClicked: EventEmitter<ListItem> = new EventEmitter();
  currentDate: number;

  constructor() {
    this.currentDate = Date.now(); 
  }

  ngOnInit() {
  }

  onListItemClickedEvent(listItem: ListItem) {
    this.listItemClicked.emit(listItem);
  }
}
