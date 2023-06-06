import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppShellPage } from './app-shell.page';

const routes: Routes = [
  {
    path: '',
    component: AppShellPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppShellPageRoutingModule {}
