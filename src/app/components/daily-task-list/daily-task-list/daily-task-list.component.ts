import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { IListItem } from 'src/app/models/i-list-item';
import { List } from 'src/app/models/list';
import { isList } from 'src/app/functions/is-list/is-list.function';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { NestedDragDropService } from 'src/app/services/nested-drag-drop/nested-drag-drop.service';
import { ListService } from 'src/app/services/list/list.service';
import { Subject, takeUntil } from 'rxjs';
import { Task } from 'src/app/models/task';

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

  @Input() taskList: WritableSignal<List>;
  currentDate: number;
  isList = isList;
  connectedLists: CdkDropList<any>[];
  ngUnsub$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public listService: ListService,
    public nestedDragDropService: NestedDragDropService,
  ) {
    this.currentDate = Date.now();
  }

  ngOnInit(): void {
    this.connectedLists = this.nestedDragDropService.dropLists$();
  }

  ngOnDestroy(): void {
    if (this.dropList) {
      this.nestedDragDropService.unregister(this.dropList);
    }

    this.ngUnsub$.next(true);
    this.ngUnsub$.complete();
  }

  allowDropPredicate = (drag: CdkDrag, drop: CdkDropList): boolean => {
    return this.nestedDragDropService.isDropAllowed(drag, drop);
  };

  onItemDropped(ev: CdkDragDrop<any[]>): void {
    this.nestedDragDropService.drop(ev);
  }
}
