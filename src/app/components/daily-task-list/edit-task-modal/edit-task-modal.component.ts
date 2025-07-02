import { Component, Input, OnInit } from '@angular/core';
import { InputCustomEvent, ModalController } from '@ionic/angular';
import { cloneDeep } from 'lodash';
import { Subject, takeUntil } from 'rxjs';
import { TaskPriority } from 'src/app/models/enums/task-priority';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss'],
})

export class EditTaskModalComponent implements OnInit {
  @Input() task: Task;
  newSubtaskPopupHeader: string;
  confirmationPopupHeader: string;
  nameUpdate: string | undefined;
  taskPriority: TaskPriority = TaskPriority.low;
  taskName: string = '';
  private ngUnsub$ = new Subject<void>();

  public confirmationPopupButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Delete',
      role: 'confirm',
      cssClass: 'alert-button-delete',
    },
  ];

  constructor(
    private modalCtl: ModalController,
    private taskService: TaskService
  ) {
    this.confirmationPopupHeader = 'Are you sure?';
  }

  ngOnInit(): void {
    this.taskName = this.task.name;
    this.taskPriority = this.task.priority;
  }

  cancelClicked(): void {
    this.modalCtl.dismiss(null, 'cancel');
  }

  saveClicked(): void {
    if (this.nameUpdate && this.nameUpdate !== this.task.name) {
      let taskClone = cloneDeep(this.task);
      taskClone.name = this.nameUpdate;
      taskClone.priority = this.taskPriority;
      this.taskService.updateTask(taskClone);
    }

    this.modalCtl.dismiss(null, 'confirm');
  }

  setName(ev: InputCustomEvent): void {
    this.nameUpdate = ev.detail.value!;
  }

  onDeletePopupDismissed(ev: any): void {
    if (ev.detail.role === 'confirm') {
      this.taskService.deleteTask(this.task.id)
      .pipe(takeUntil(this.ngUnsub$))
      .subscribe({
        next: (_complete) => {
          this.modalCtl.dismiss(null, 'confirm');
        },
        error: (err) => {
          // TODO handle error properly
          console.error('Error creating task:', err);
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.ngUnsub$.next();
    this.ngUnsub$.complete();
  }

  onPrioritySelected(event: any) {
     this.taskPriority = event.detail.value;
  }
}
