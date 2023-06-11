import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DailyTaskListComponent } from './daily-task-list/daily-task-list.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { InsetListComponent } from './inset-list/inset-list.component';
import { ListItemComponent } from './list-item/list-item.component';



@NgModule({
  declarations: [DailyTaskListComponent, InsetListComponent, ListItemComponent],
  exports: [DailyTaskListComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  providers: [DatePipe]
})
export class ComponentsModule { }
