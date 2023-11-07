import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyTaskListPage } from './daily-task-list.page';

const routes: Routes = [
  {
    path: '',
    component: DailyTaskListPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyTaskListPageRoutingModule {}
