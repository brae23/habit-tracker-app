import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { InsetListComponent } from './daily-task-list/inset-list/inset-list.component';
import { ListItemComponent } from './daily-task-list/list-item/list-item.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DailyTaskListComponent } from './daily-task-list/daily-task-list/daily-task-list.component';
import { NewTaskComponent } from './daily-task-list/new-task/new-task.component';
import { EditTaskModalComponent } from './daily-task-list/edit-task-modal/edit-task-modal.component';
import { PageHeaderComponent } from './shared/page-header/page-header.component';
import { ListAnchorComponent } from './lists-page/list-anchor/list-anchor.component';

@NgModule({
  declarations: [
    DailyTaskListComponent,
    InsetListComponent,
    ListItemComponent,
    NewTaskComponent,
    EditTaskModalComponent,
    PageHeaderComponent,
    ListAnchorComponent,
  ],
  exports: [
    DailyTaskListComponent,
    EditTaskModalComponent,
    PageHeaderComponent,
    ListAnchorComponent,
  ],
  imports: [CommonModule, FormsModule, IonicModule, DragDropModule],
  providers: [DatePipe],
})
export class ComponentsModule {}
