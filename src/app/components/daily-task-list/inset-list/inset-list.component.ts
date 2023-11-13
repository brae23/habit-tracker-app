import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Signal,
  ViewChild,
  WritableSignal,
  computed,
  signal,
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
import { DailyTaskListService } from 'src/app/services/daily-task-list.service';

@Component({
  selector: 'app-daily-task-list-inset-list',
  templateUrl: './inset-list.component.html',
  styleUrls: ['./inset-list.component.scss'],
})
export class InsetListComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() listItemId: string;
  @Input() isEditMode: boolean;
  @ViewChild(CdkDropList) dropList?: CdkDropList;
  @ViewChild('insetListItemContainer') insetListItemContainer: ElementRef;

  taskList: Signal<IListItem>;
  isCollapsed: boolean = true;
  completedTaskCount: Signal<number>;
  listLength: Signal<number>;

  allowDropPredicate = (drag: CdkDrag, drop: CdkDropList) => {
    return this.nestedDragDropService.isDropAllowed(drag, drop);
  };

  public get connectedLists() {
    return this.nestedDragDropService.dropLists;
  }

  public get dragDisabled() {
    if (!this.isCollapsed) {
      return true;
    } else {
      return !this.isEditMode;
    }
  }

  constructor(
    public nestedDragDropService: NestedDragDropService,
    private dailyTaskListService: DailyTaskListService,
    private modalCtl: ModalController,
  ) {}

  ngOnInit(): void {
    this.taskList = this.dailyTaskListService.getListItem(this.listItemId);
    this.listLength = computed(() => this.taskList().listItems?.length!);
    this.completedTaskCount = signal(0);
    this.evaluateCompletedState();
  }

  ngOnChanges(): void {
    this.evaluateCompletedState();
  }

  ngAfterViewInit(): void {
    if (this.dropList) {
      this.nestedDragDropService.register(this.dropList);
    }
  }

  ngOnDestroy(): void {
    if (this.dropList) {
      this.nestedDragDropService.unregister(this.dropList);
    }
  }

  listItemClickedEvent(listItem: IListItem): void {
    this.dailyTaskListService.updateListItemCompletedState(listItem.id, this.taskList().id, !listItem.completed);
  }

  onListClicked(currentVal: boolean): void {
    this.isCollapsed = !currentVal;
  }

  onItemDropped(ev: any): void {
    this.nestedDragDropService.drop(ev);
    this.evaluateCompletedState();
  }

  dragMoved(event: CdkDragMove<IListItem>): void {
    this.nestedDragDropService.dragMoved(event);
  }

  dragReleased(event: CdkDragRelease): void {
    this.nestedDragDropService.dragReleased(event);
  }

  async itemEditClicked(listItem: any = null): Promise<void> {
    let editTaskModal = await this.modalCtl.create({
      component: EditTaskModalComponent,

      componentProps: {
        ['listItem']: listItem ?? this.taskList,
      },
    });

    editTaskModal.present();
  }

  private evaluateCompletedState(): void {
    this.completedTaskCount = computed(() => {
      let completedTaskCount: number = 0;
      this.taskList().listItems?.forEach((item: IListItem) => {
        if (item.completed) {
          completedTaskCount++
        }
      })
      return completedTaskCount;
    })    
  }
}
