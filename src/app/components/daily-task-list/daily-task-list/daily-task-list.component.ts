import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IListItem } from 'src/app/models/i-list-item';
import { TaskList } from 'src/app/models/task-list';
import { isList } from 'src/app/functions/is-list/is-list.function';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { NestedDragDropService } from 'src/app/services/nested-drag-drop/nested-drag-drop.service';
import { DailyTaskListService } from 'src/app/services/daily-task-list/daily-task-list.service';

@Component({
  selector: 'app-daily-task-list',
  templateUrl: './daily-task-list.component.html',
  styleUrls: ['./daily-task-list.component.scss'],
})
export class DailyTaskListComponent implements OnInit, OnDestroy {
  @ViewChild(CdkDropList) set dropList(list: CdkDropList) {
    if (list) {
      this.nestedDragDropService.register(list);
    }
  }

  taskList: TaskList;
  currentDate: number;
  isList = isList;
  connectedLists: CdkDropList<any>[];

  constructor(
    public dailyTaskListService: DailyTaskListService,
    public nestedDragDropService: NestedDragDropService,
  ) {
    this.currentDate = Date.now();
  }

  ngOnInit(): void {
    this.taskList = this.dailyTaskListService.dailyTaskList$();
    this.connectedLists = this.nestedDragDropService.dropLists$();
  }

  ngOnDestroy(): void {
    if (this.dropList) {
      this.nestedDragDropService.unregister(this.dropList);
    }
  }

  allowDropPredicate = (drag: CdkDrag, drop: CdkDropList): boolean => {
    return this.nestedDragDropService.isDropAllowed(drag, drop);
  };

  onItemDropped(ev: CdkDragDrop<IListItem[]>): void {
    this.nestedDragDropService.drop(ev);
  }
}
