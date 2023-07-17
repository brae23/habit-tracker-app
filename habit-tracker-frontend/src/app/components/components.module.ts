import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { InsetListComponent } from './daily-task-list/inset-list/inset-list.component';
import { ListItemComponent } from './daily-task-list/list-item/list-item.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DailyTaskListComponent } from './daily-task-list/daily-task-list/daily-task-list.component';
import { NewTaskComponent } from './daily-task-list/new-task/new-task.component';
import { DailyTaskListTaskGestures } from '../gestures/dtl-task.gesture';
import { EditTaskModalComponent } from './daily-task-list/edit-task-modal/edit-task-modal.component';

@NgModule({
  declarations: [
    DailyTaskListComponent, 
    InsetListComponent, 
    ListItemComponent, 
    NewTaskComponent,
    EditTaskModalComponent
  ],
  exports: [DailyTaskListComponent, EditTaskModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DragDropModule,
  ],
  providers: [DatePipe, DailyTaskListTaskGestures]
})
export class ComponentsModule { }
