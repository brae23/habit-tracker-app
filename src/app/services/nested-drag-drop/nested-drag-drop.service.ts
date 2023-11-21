import {
  CdkDrag,
  CdkDragDrop,
  CdkDragMove,
  CdkDragRelease,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, WritableSignal, signal } from '@angular/core';
import { IListItem } from '../../models/i-list-item';
import { DailyTaskListService } from '../daily-task-list/daily-task-list.service';

@Injectable({
  providedIn: 'root',
})
export class NestedDragDropService {
  public dropLists$: WritableSignal<CdkDropList<any>[]>;
  private _currentHoverDropListId?: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private dailyTaskListService: DailyTaskListService,
  ) {
    this.dropLists$ = signal([]);
  }

  register(dropList: CdkDropList) {
    this.dropLists$.update((lists) => {
      lists.push(dropList);
      return lists;
    });
  }

  unregister(dropList: CdkDropList) {
    if (this.dropLists$().includes(dropList)) {
      this.dropLists$.update((lists) => {
        lists.splice(
          lists.findIndex((x) => x.id == dropList.id),
          1,
        );
        return lists;
      });
    }
  }

  /* Istanbul ignore next */
  dragMoved(event: CdkDragMove<IListItem>) {
    let elementFromPoint = this.document.elementFromPoint(
      event.pointerPosition.x,
      event.pointerPosition.y,
    );

    if (!elementFromPoint) {
      this._currentHoverDropListId = undefined;
      return;
    }

    let dropList = elementFromPoint.classList.contains('cdk-drop-list')
      ? elementFromPoint
      : elementFromPoint.closest('.cdk-drop-list');

    if (!dropList) {
      this._currentHoverDropListId = undefined;
      return;
    }

    this._currentHoverDropListId = dropList.id;
  }

  /* Istanbul ignore next */
  dragReleased(_event: CdkDragRelease) {
    this._currentHoverDropListId = undefined;
  }

  /* Istanbul ignore next */
  isDropAllowed(_drag: CdkDrag, drop: CdkDropList) {
    if (this._currentHoverDropListId == null) {
      return true;
    }

    return drop.id === this._currentHoverDropListId;
  }

  drop(event: CdkDragDrop<IListItem[]>) {
    this.dailyTaskListService.handleItemIndexReorder(event);
  }
}
