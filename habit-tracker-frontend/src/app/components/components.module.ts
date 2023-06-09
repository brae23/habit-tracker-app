import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DailyTaskListComponent } from './daily-task-list/daily-task-list.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [DailyTaskListComponent],
  exports: [DailyTaskListComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  providers: [DatePipe]
})
export class ComponentsModule { }
