import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IListItem } from 'src/app/models/i-list-item';
import { TaskList } from 'src/app/models/task-list';
import { isList } from 'src/app/functions/is-list.function';
import { DailyTaskListStateFacade } from 'src/app/data-access/+state/daily-task-list/daily-task-list-state.facade';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { NestedDragDropService } from 'src/app/services/nested-drag-drop.service';

@Component({
  selector: 'app-daily-task-list',
  templateUrl: './daily-task-list.component.html',
  styleUrls: ['./daily-task-list.component.scss'],
})
export class DailyTaskListComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @Input() taskList$: Observable<TaskList>;
  @Input() isEditMode: boolean;
  @ViewChild(CdkDropList) dropList?: CdkDropList;

  currentDate: number;
  isList = isList;
  taskList: TaskList;
  ngUnsub$: Subject<boolean> = new Subject<boolean>();

  allowDropPredicate = (drag: CdkDrag, drop: CdkDropList) => {
    return this.nestedDragDropService.isDropAllowed(drag, drop);
  };

  public get connectedLists() {
    return this.nestedDragDropService.dropLists;
  }

  constructor(
    public dailyTaskListStateFacade: DailyTaskListStateFacade,
    public nestedDragDropService: NestedDragDropService,
  ) {
    this.currentDate = Date.now();
  }

  ngOnInit() {
    this.taskList$
      .pipe(takeUntil(this.ngUnsub$))
      .subscribe((x) => (this.taskList = x));
  }

  ngOnDestroy() {
    this.ngUnsub$.next(true);
    this.ngUnsub$.unsubscribe();
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
