import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { InsetListComponent } from './daily-task-list/inset-list/inset-list.component';
import { ListItemComponent } from './daily-task-list/list-item/list-item.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DailyTaskListComponent } from './daily-task-list/daily-task-list/daily-task-list.component';
import { NewTaskComponent } from './daily-task-list/new-task/new-task.component';
import { SwipeDeleteGesture } from '../gestures/swipe-delete.gesture';

@NgModule({
  declarations: [DailyTaskListComponent, InsetListComponent, ListItemComponent, NewTaskComponent],
  exports: [DailyTaskListComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DragDropModule,
  ],
  providers: [DatePipe, SwipeDeleteGesture]
})
export class ComponentsModule { }
