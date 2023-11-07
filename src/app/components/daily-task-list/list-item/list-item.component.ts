import { CdkDragMove, CdkDragRelease } from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { cloneDeep } from 'lodash';
import { DailyTaskListStateFacade } from 'src/app/data-access/+state/daily-task-list/daily-task-list-state.facade';
import { isList } from 'src/app/functions/is-list.function';
import { IListItem } from 'src/app/models/i-list-item';
import { NestedDragDropService } from 'src/app/services/nested-drag-drop.service';
import { ModalController } from '@ionic/angular';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';

@Component({
  selector: 'app-daily-task-list-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @ViewChildren('listItemContainer') listItemContainer: QueryList<ElementRef>;
  @Input() listItem: any;
  canCommitNewTask: boolean;
  editTaskModal: HTMLIonModalElement;

  isList = isList;

  constructor(
    private dailyTaskListStateFacade: DailyTaskListStateFacade,
    private nestedDragDropService: NestedDragDropService,
    private modalCtl: ModalController,
  ) {}

  ngOnInit(): void {
    this.createModal();
  }

  onListItemClickedEvent(listItem: any) {
    let tempListItem = cloneDeep(listItem);
    tempListItem.completed = !listItem.completed;
    this.dailyTaskListStateFacade.updateListItem(tempListItem);
  }

  dragMoved(event: CdkDragMove<IListItem>) {
    this.nestedDragDropService.dragMoved(event);
  }

  dragReleased(event: CdkDragRelease) {
    this.nestedDragDropService.dragReleased(event);
  }

  itemEditClicked() {
    this.editTaskModal.present();
  }

  private async createModal() {
    this.editTaskModal = await this.modalCtl.create({
      component: EditTaskModalComponent,

      componentProps: {
        ['listItemId']: this.listItem.id,
        ['parentListItemId']: this.listItem.parentListId,
      },
    });
  }
}
