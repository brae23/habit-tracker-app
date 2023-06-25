import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { IListItem } from 'src/app/models/i-list-item';
import { TaskList } from 'src/app/models/task-list';
import { isList } from 'src/app/functions/is-list.function';
import { DailyTaskListStateFacade } from 'src/app/data-access/+state/daily-task-list/daily-task-list-state.facade';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-daily-task-list',
  templateUrl: './daily-task-list.component.html',
  styleUrls: ['./daily-task-list.component.scss'],
})
export class DailyTaskListComponent  implements OnInit {

  @Input() taskList$: Observable<TaskList>;
  @Input() isEditMode: boolean;
  currentDate: number;
  isList = isList;

  constructor(public dailyTaskListStateFacade: DailyTaskListStateFacade) {
    this.currentDate = Date.now(); 
  }

  ngOnInit() {
  }

  onListItemReorderedEvent(ev: CdkDragDrop<IListItem[]>) {
    this.dailyTaskListStateFacade.handleItemIndexReorder(ev);
  }
}
