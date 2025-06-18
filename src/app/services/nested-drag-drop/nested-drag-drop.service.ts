import {
  CdkDrag,
  CdkDragDrop,
  CdkDragMove,
  CdkDragRelease,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, WritableSignal, signal } from '@angular/core';
import { IListItem } from 'src/app/models/i-list-item';
import { ListService } from '../list/list.service';
import { TaskService } from '../task/task.service';
import { findListItemArray } from 'src/app/functions/find-list/find-list.function';

@Injectable({
  providedIn: 'root',
})
export class NestedDragDropService {
  public dropLists$: WritableSignal<CdkDropList<any>[]>;
  private _currentHoverDropListId?: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private listService: ListService,
    private taskService: TaskService
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
    this.handleItemIndexReorder(event);
  }

  handleItemIndexReorder(ev: CdkDragDrop<IListItem[]>): void {
    let listId = ev.container.id;
    let previousListId = ev.previousContainer.id;

    // this.dailyTaskList$.update((taskList) => {
    //   if (ev.previousContainer === ev.container) {
    //     moveItemInArray(
    //       findListItemArray(taskList, listId)!,
    //       ev.previousIndex,
    //       ev.currentIndex,
    //     );
    //   } else {
    //     let previousList = findListItemArray(taskList, previousListId);
    //     transferArrayItem(
    //       previousList!,
    //       findListItemArray(taskList, listId)!,
    //       ev.previousIndex,
    //       ev.currentIndex,
    //     );
    //     if (previousList!.length == 0) {
    //       taskList.listItems.map((x) =>
    //         x.id == previousListId ? toTask(previousList) : x,
    //       );
    //     }
    //   }

    //   return taskList;
    // });
  }
}
