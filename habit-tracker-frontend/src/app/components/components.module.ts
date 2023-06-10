import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DailyTaskListComponent } from './daily-task-list/daily-task-list.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { InsetListComponent } from './inset-list/inset-list.component';



@NgModule({
  declarations: [DailyTaskListComponent, InsetListComponent],
  exports: [DailyTaskListComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  providers: [DatePipe]
})
export class ComponentsModule { }
