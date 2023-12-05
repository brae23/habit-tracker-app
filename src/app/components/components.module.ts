import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { InsetListComponent } from './daily-task-list/inset-list/inset-list.component';
import { ListItemComponent } from './daily-task-list/list-item/list-item.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DailyTaskListComponent } from './daily-task-list/daily-task-list/daily-task-list.component';
import { EditTaskModalComponent } from './daily-task-list/edit-task-modal/edit-task-modal.component';
import { PageHeaderComponent } from './shared/page-header/page-header.component';
import { ListAnchorComponent } from './lists-page/list-anchor/list-anchor.component';
import { NewTaskModalComponent } from './daily-task-list/new-task-modal/new-task-modal.component';
import { LoginModalComponent } from './login/login-modal/login-modal.component';
import { CreateUserModalComponent } from './login/create-account-modal/create-user-modal.component';

@NgModule({
  declarations: [
    DailyTaskListComponent,
    InsetListComponent,
    ListItemComponent,
    EditTaskModalComponent,
    PageHeaderComponent,
    ListAnchorComponent,
    NewTaskModalComponent,
    LoginModalComponent,
    CreateUserModalComponent,
  ],
  exports: [
    DailyTaskListComponent,
    EditTaskModalComponent,
    PageHeaderComponent,
    ListAnchorComponent,
    NewTaskModalComponent,
    LoginModalComponent,
    CreateUserModalComponent,
  ],
  imports: [CommonModule, FormsModule, IonicModule, DragDropModule],
  providers: [DatePipe],
})
export class ComponentsModule {}
