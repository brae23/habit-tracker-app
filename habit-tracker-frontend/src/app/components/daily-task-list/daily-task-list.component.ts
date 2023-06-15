import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { IListItem } from 'src/app/models/i-list-item';
import { TaskList } from 'src/app/models/task-list';
import { isList } from 'src/app/functions/is-list.function';
import { ItemReorderEventDetail } from '@ionic/angular';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-daily-task-list',
  templateUrl: './daily-task-list.component.html',
  styleUrls: ['./daily-task-list.component.scss'],
})
export class DailyTaskListComponent  implements OnInit {

  @Input() taskList$: Observable<TaskList>;
  @Input() isEditMode: boolean;
  @Output() listItemReordered: EventEmitter<any> = new EventEmitter<any>;
  currentDate: number;
  isList = isList;

  constructor() {
    this.currentDate = Date.now(); 
  }

  ngOnInit() {
  }

  handleListItemReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    this.taskList$.subscribe((x) => {
      let tempTaskList: TaskList;
      tempTaskList = cloneDeep(x);
      let reorderedItem = tempTaskList.listItems.splice(ev.detail.from, 1)[0];
      tempTaskList.listItems.splice(ev.detail.to, 0, reorderedItem);
      ev.detail.complete();
      this.listItemReordered.emit(tempTaskList);
    });
  }

  onListItemReorderedEvent(listItem: any) {
    this.listItemReordered.emit(listItem);
  }
}
