import { CdkDropList } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { Component, OnInit, Signal, ViewChild, WritableSignal, signal } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { NewTaskModalComponent } from 'src/app/components/daily-task-list/new-task-modal/new-task-modal.component';
import { IListItem } from 'src/app/models/i-list-item';
import { List } from 'src/app/models/list';
import { ListService } from 'src/app/services/list/list.service';

@Component({
  selector: 'app-daily-task-list-page',
  templateUrl: './daily-task-list.page.html',
  styleUrls: ['./daily-task-list.page.scss'],
})
export class DailyTaskListPage implements OnInit {
  @ViewChild(CdkDropList) dropList?: CdkDropList;
  testUserId: string = 'TestUserId1';
  listReorderingTemp: IListItem;
  title: string;
  dailyTaskList$: WritableSignal<List>;
  ngUnsub$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private modalCtl: ModalController,
    private datePipe: DatePipe,
    private listService: ListService,
  ) {}

  ngOnInit() {
    this.title = this.datePipe.transform(Date.now(), 'mediumDate')!;
    this.getTaskList();
  }

  async onNewTaskClicked() {
    let newTaskModal = await this.modalCtl.create({
      component: NewTaskModalComponent,
      showBackdrop: false,
      componentProps: {
        listId: this.dailyTaskList$().id,
      },
    });

    await newTaskModal.present();

    const { data, role } = await newTaskModal.onDidDismiss();

    if (role === 'confirm') {
      console.log('New task created:', data);
      this.getTaskList(); // Refresh the task list after creating a new task
    } else {
      console.log('New task creation canceled');
    }
  }

  getTaskList() {
    this.listService.getDailyTaskList()
      .pipe(takeUntil(this.ngUnsub$))
      .subscribe({
          next: (list: List) => {
            this.dailyTaskList$ = signal(list);
          },
          error: (err) => {
            console.error('Error retrieving daily task list:', err);
            // TODO: Add error handling logic here, such as showing a toast or alert
          }
      });
  }
}
