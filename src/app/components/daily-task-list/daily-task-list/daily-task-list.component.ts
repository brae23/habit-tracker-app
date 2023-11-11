import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { IListItem } from 'src/app/models/i-list-item';
import { TaskList } from 'src/app/models/task-list';
import { isList } from 'src/app/functions/is-list.function';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { NestedDragDropService } from 'src/app/services/nested-drag-drop.service';
import { DailyTaskListState } from 'src/app/data-access/+state/daily-task-list/daily-task-list.state';

@Component({
  selector: 'app-daily-task-list',
  templateUrl: './daily-task-list.component.html',
  styleUrls: ['./daily-task-list.component.scss'],
})
export class DailyTaskListComponent
  implements AfterViewInit
{
  @Input() taskList: TaskList;
  @ViewChild(CdkDropList) dropList?: CdkDropList;

  currentDate: number;
  isList = isList;

  allowDropPredicate = (drag: CdkDrag, drop: CdkDropList) => {
    return this.nestedDragDropService.isDropAllowed(drag, drop);
  };

  public get connectedLists() {
    return this.nestedDragDropService.dropLists;
  }

  constructor(
    public state: DailyTaskListState,
    public nestedDragDropService: NestedDragDropService,
  ) {
    this.currentDate = Date.now();
  }

  ngAfterViewInit() {
    if (this.dropList) {
      this.nestedDragDropService.register(this.dropList);
    }
  }

  onItemDropped(ev: CdkDragDrop<IListItem[]>) {
    this.nestedDragDropService.drop(ev);
  }
}
