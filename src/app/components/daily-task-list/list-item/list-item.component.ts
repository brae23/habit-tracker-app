import { CdkDragMove, CdkDragRelease } from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Signal,
  ViewChildren,
  computed,
} from '@angular/core';
import { isList } from 'src/app/functions/is-list/is-list.function';
import { IListItem } from 'src/app/models/i-list-item';
import { NestedDragDropService } from 'src/app/services/nested-drag-drop/nested-drag-drop.service';
import { ModalController } from '@ionic/angular';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task/task.service';
import { Subject, takeUntil } from 'rxjs';
import { TaskPriority } from 'src/app/models/enums/task-priority';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-daily-task-list-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit, OnDestroy {
  @ViewChildren('listItemContainer') listItemContainer: QueryList<ElementRef>;
  @Input() task: Task;
  @Output() editModalDismissed: EventEmitter<void> = new EventEmitter<void>();
  isListItemCompleted: Signal<boolean>;
  ngUnsub$: Subject<boolean> = new Subject<boolean>();
  shouldShowPriorityChip: Signal<boolean>;

  isList = isList;

  constructor(
    private nestedDragDropService: NestedDragDropService,
    private modalCtl: ModalController,
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    this.isListItemCompleted = computed(() => this.task.completed);
    this.shouldShowPriorityChip = computed(() => this.task.priority === TaskPriority.urgent);
  }

   ngOnDestroy(): void {
    this.ngUnsub$.next(true);
    this.ngUnsub$.complete();
  }

  onListItemClickedEvent() {
    console.log('List item clicked:', this.task.name);
    this.task.completed = !this.task.completed;
    this.taskService.updateTask(this.task)
      .pipe(takeUntil(this.ngUnsub$))
      .subscribe({
        next: () => {
          // Task updated successfully
          this.isListItemCompleted = computed(() => this.task.completed);
        },
        error: (err) => {
          console.error('Error updating task:', err);
          // TODO: Add error handling logic here, such as showing a toast or alert
        }
      });
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
        ['task']: this.task,
      },
    });

    await editTaskModal.present();

    const { data, role } = await editTaskModal.onDidDismiss();

    if (role === 'confirm') {
      console.log('New task created:', data);
      this.editModalDismissed.emit();
    } else {
      console.log('New task creation canceled');
    }
  }
}
