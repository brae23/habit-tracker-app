import { CdkDragMove, CdkDragRelease } from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  Signal,
  ViewChildren,
  computed,
} from '@angular/core';
import { isList } from 'src/app/functions/is-list.function';
import { IListItem } from 'src/app/models/i-list-item';
import { NestedDragDropService } from 'src/app/services/nested-drag-drop.service';
import { ModalController } from '@ionic/angular';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';
import { DailyTaskListService } from 'src/app/services/daily-task-list.service';

@Component({
  selector: 'app-daily-task-list-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @ViewChildren('listItemContainer') listItemContainer: QueryList<ElementRef>;
  @Input() listItemId: string;
  listItem: Signal<IListItem>;
  isListItemCompleted: Signal<boolean>;

  isList = isList;

  constructor(
    private dailyTaskListService: DailyTaskListService,
    private nestedDragDropService: NestedDragDropService,
    private modalCtl: ModalController,
  ) {}

  ngOnInit(): void {
    this.listItem = this.dailyTaskListService.getListItem(this.listItemId);
    this.isListItemCompleted = computed(() => this.listItem().completed);
  }

  onListItemClickedEvent() {
    this.dailyTaskListService.updateListItemCompletedState(
      this.listItemId,
      undefined,
      !this.isListItemCompleted(),
    );
  }

  dragMoved(event: CdkDragMove<IListItem>) {
    this.nestedDragDropService.dragMoved(event);
  }

  dragReleased(event: CdkDragRelease) {
    this.nestedDragDropService.dragReleased(event);
  }

  async itemEditClicked() {
    let editTaskModal = await this.modalCtl.create({
      component: EditTaskModalComponent,

      componentProps: {
        ['listItem']: this.listItem,
      },
    });

    editTaskModal.present();
  }
}
