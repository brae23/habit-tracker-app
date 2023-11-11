import { CdkDragMove, CdkDragRelease } from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { isList } from 'src/app/functions/is-list.function';
import { IListItem } from 'src/app/models/i-list-item';
import { NestedDragDropService } from 'src/app/services/nested-drag-drop.service';
import { ModalController } from '@ionic/angular';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';
import { DailyTaskListState } from 'src/app/data-access/+state/daily-task-list/daily-task-list.state';

@Component({
  selector: 'app-daily-task-list-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  @ViewChildren('listItemContainer') listItemContainer: QueryList<ElementRef>;
  @Input() listItem: IListItem;
  canCommitNewTask: boolean;

  isList = isList;

  constructor(
    private state: DailyTaskListState,
    private nestedDragDropService: NestedDragDropService,
    private modalCtl: ModalController,
  ) {}

  onListItemClickedEvent() {
    this.state.updateListItemCompletedState(this.listItem.id, undefined, this.listItem.completed);
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
