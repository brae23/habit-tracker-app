import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListsHomePage } from './lists-home.page';

const routes: Routes = [
  {
    path: '',
    component: ListsHomePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListsHomePageRoutingModule {}
