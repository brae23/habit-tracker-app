import { Component, Input, OnDestroy } from '@angular/core';
import { InputCustomEvent, ModalController } from '@ionic/angular';
import { TaskService } from 'src/app/services/task/task.service';
import { Task } from 'src/app/models/task';
import { TaskPriority } from 'src/app/models/enums/task-priority';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.scss'],
})
export class NewTaskModalComponent implements OnDestroy {
  @Input() listId: string | undefined;

  newTaskName: string | undefined;
  newTaskPriority: TaskPriority = TaskPriority.low;

  ngUnsub$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private modalCtl: ModalController,
    private taskService: TaskService,
  ) {}

  ngOnDestroy(): void {
    this.ngUnsub$.next(true);
    this.ngUnsub$.complete();
  }

  saveClicked() {
    if (this.newTaskName && this.newTaskName.length > 0) {
      let newTaskItem: Partial<Task> = {
        name: this.newTaskName,
        parentListId: this.listId,
        priority: Number(this.newTaskPriority),
      };
      this.taskService.createTask(newTaskItem)
        .pipe(takeUntil(this.ngUnsub$))
        .subscribe({
          next: (task) => {
            console.log('New task created:', task);
            this.modalCtl.dismiss(null, 'confirm');
          },
          error: (err) => {
            // TODO handle error properly
            console.error('Error creating task:', err);
          },
        });
    }
  }

  cancelClicked() {
    this.modalCtl.dismiss(null, 'cancel');
  }

  setName(ev: InputCustomEvent) {
    this.newTaskName = ev.detail.value!;
  }
}
