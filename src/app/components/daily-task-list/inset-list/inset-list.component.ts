import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Signal,
  ViewChild,
  computed,
  signal,
} from '@angular/core';
import { IListItem } from 'src/app/models/i-list-item';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { NestedDragDropService } from 'src/app/services/nested-drag-drop/nested-drag-drop.service';
import { ModalController } from '@ionic/angular';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';
import { List } from 'src/app/models/list';

@Component({
  selector: 'app-daily-task-list-inset-list',
  templateUrl: './inset-list.component.html',
  styleUrls: ['./inset-list.component.scss'],
})
export class InsetListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() list: List;
  @ViewChild(CdkDropList) set dropList(list: CdkDropList) {
    if (list) {
      this.nestedDragDropService.register(list);
    }
  }
  @ViewChild('insetListItemContainer') insetListItemContainer: ElementRef;

  taskList: Signal<IListItem>;
  isCollapsed: boolean = true;
  completedTaskCount: Signal<number>;
  listLength: Signal<number>;
  connectedLists: CdkDropList<any>[];

  constructor(
    public nestedDragDropService: NestedDragDropService,
    private modalCtl: ModalController,
  ) {}

  ngOnInit(): void {
    this.listLength = computed(() => this.list.tasks.length + this.list.sublists.length);
    this.completedTaskCount = signal(0);
    this.connectedLists = this.nestedDragDropService.dropLists$();
    this.evaluateCompletedState();
  }

  ngOnChanges(): void {
    this.evaluateCompletedState();
  }

  ngOnDestroy(): void {
    if (this.dropList) {
      this.nestedDragDropService.unregister(this.dropList);
    }
  }

  allowDropPredicate = (drag: CdkDrag, drop: CdkDropList) => {
    return this.nestedDragDropService.isDropAllowed(drag, drop);
  };

  listItemClickedEvent(listItem: IListItem): void {
    // this.dailyTaskListService.updateListItemCompletedState(
    //   listItem.id,
    //   this.taskList().id,
    //   !listItem.completed,
    // );
  }

  onListClicked(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  onItemDropped(ev: any): void {
    this.nestedDragDropService.drop(ev);
    this.evaluateCompletedState();
  }

  async itemEditClicked(
    listItem: IListItem | undefined = undefined,
  ): Promise<void> {
    let editTaskModal = await this.modalCtl.create({
      component: EditTaskModalComponent,
      componentProps: {
        ['listItem']: listItem === undefined ? this.taskList : signal(listItem),
      },
    });

    editTaskModal.present();
  }

  private evaluateCompletedState(): void {
    // this.completedTaskCount = computed(() => {
    //   let completedTaskCount: number = 0;
    //   this.taskList().listItems?.forEach((item: IListItem) => {
    //     if (item.completed) {
    //       completedTaskCount++;
    //     }
    //   });
    //   return completedTaskCount;
    // });
  }
}
