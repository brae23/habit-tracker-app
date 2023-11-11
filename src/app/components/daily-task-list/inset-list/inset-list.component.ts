import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IListItem } from 'src/app/models/i-list-item';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragMove,
  CdkDragRelease,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { NestedDragDropService } from 'src/app/services/nested-drag-drop.service';
import { ModalController } from '@ionic/angular';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';
import { DailyTaskListState } from 'src/app/data-access/+state/daily-task-list/daily-task-list.state';

@Component({
  selector: 'app-daily-task-list-inset-list',
  templateUrl: './inset-list.component.html',
  styleUrls: ['./inset-list.component.scss'],
})
export class InsetListComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() taskList: any;
  @Input() isEditMode: boolean;
  @ViewChild(CdkDropList) dropList?: CdkDropList;
  @ViewChild('insetListItemContainer') insetListItemContainer: ElementRef;

  completedTaskCount: number = 0;

  allowDropPredicate = (drag: CdkDrag, drop: CdkDropList) => {
    return this.nestedDragDropService.isDropAllowed(drag, drop);
  };

  public get connectedLists() {
    return this.nestedDragDropService.dropLists;
  }

  public get dragDisabled() {
    if (!this.taskList.isCollapsed) {
      return true;
    } else {
      return !this.isEditMode;
    }
  }

  constructor(
    public nestedDragDropService: NestedDragDropService,
    private state: DailyTaskListState,
    private modalCtl: ModalController,
  ) {}

  ngOnInit(): void {
    this.evaluateCompletedState();
  }

  ngOnChanges(): void {
    this.evaluateCompletedState();
  }

  ngAfterViewInit() {
    if (this.dropList) {
      this.nestedDragDropService.register(this.dropList);
    }
  }

  ngOnDestroy() {
    if (this.dropList) {
      this.nestedDragDropService.unregister(this.dropList);
    }
  }

  listItemClickedEvent(listItem: IListItem) {
    this.state.updateListItemCompletedState(listItem.id, this.taskList.id, !listItem.completed);
  }

  onListClicked(currentVal: boolean) {
    this.taskList.isCollapsed = !currentVal;
  }

  onItemDropped(ev: CdkDragDrop<IListItem[]>) {
    this.nestedDragDropService.drop(ev);
    this.evaluateCompletedState();
  }

  dragMoved(event: CdkDragMove<IListItem>) {
    this.nestedDragDropService.dragMoved(event);
  }

  dragReleased(event: CdkDragRelease) {
    this.nestedDragDropService.dragReleased(event);
  }

  async itemEditClicked(listItem: any = null) {
    let editTaskModal = await this.modalCtl.create({
      component: EditTaskModalComponent,

      componentProps: {
        ['listItem']: listItem ?? this.taskList,
      },
    });

    editTaskModal.present();
  }

  private evaluateCompletedState() {
    let completed = false;
    this.taskList.listItems.map((x: IListItem) => {
      if (x.completed) {
        this.completedTaskCount++;
      }
    });
    if (this.completedTaskCount == this.taskList.listItems.length) {
      completed = true;
    }
    this.state.updateListItemCompletedState(
      this.taskList.id,
      undefined,
      completed,
    );
  }
}
