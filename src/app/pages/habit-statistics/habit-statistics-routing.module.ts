import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HabitStatisticsPage } from './habit-statistics.page';

const routes: Routes = [
  {
    path: '',
    component: HabitStatisticsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HabitStatisticsPageRoutingModule {}
