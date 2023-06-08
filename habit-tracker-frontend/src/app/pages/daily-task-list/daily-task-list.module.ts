import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyTaskListPageRoutingModule } from './daily-task-list-routing.module';

import { DailyTaskListPage } from './daily-task-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyTaskListPageRoutingModule
  ],
  declarations: [DailyTaskListPage]
})
export class DailyTaskListPageModule {}
