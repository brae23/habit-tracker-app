import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DailyTaskListPageRoutingModule } from './daily-task-list-routing.module';
import { DailyTaskListPage } from './daily-task-list.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyTaskListPageRoutingModule,
    ComponentsModule,
    DatePipe,
  ],
  declarations: [DailyTaskListPage],
  providers: [DatePipe],
})
export class DailyTaskListPageModule {}
