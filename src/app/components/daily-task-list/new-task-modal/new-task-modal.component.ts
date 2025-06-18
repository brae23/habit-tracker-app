import { Component, Input } from '@angular/core';
import { InputCustomEvent, ModalController } from '@ionic/angular';
import { TaskService } from 'src/app/services/task/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.scss'],
})
export class NewTaskModalComponent {
  @Input() listId: string | undefined;

  newTaskName: string | undefined;

  constructor(
    private modalCtl: ModalController,
    private taskService: TaskService,
  ) {}

  saveClicked() {
    if (this.newTaskName && this.newTaskName.length > 0) {
      let newTaskItem: Partial<Task> = {
        name: this.newTaskName,
        parentListId: this.listId,
      };
      this.taskService.createTask(newTaskItem);
    }

    this.modalCtl.dismiss(null, 'confirm');
  }

  cancelClicked() {
    this.modalCtl.dismiss(null, 'cancel');
  }

  setName(ev: InputCustomEvent) {
    this.newTaskName = ev.detail.value!;
  }
}
