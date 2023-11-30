import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'daily-task-list',
    pathMatch: 'full',
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./pages/settings/settings.module').then(
        (m) => m.SettingsPageModule,
      ),
  },
  {
    path: 'lists-home',
    loadChildren: () =>
      import('./pages/lists-home/lists-home.module').then(
        (m) => m.ListsHomePageModule,
      ),
  },
  {
    path: 'daily-task-list',
    loadChildren: () =>
      import('./pages/daily-task-list/daily-task-list.module').then(
        (m) => m.DailyTaskListPageModule,
      ),
  },
  {
    path: 'user-profile',
    loadChildren: () =>
      import('./pages/user-profile/user-profile.module').then(
        (m) => m.UserProfilePageModule,
      ),
  },
  {
    path: 'habits',
    loadChildren: () =>
      import('./pages/habits/habits.module').then((m) => m.HabitsPageModule),
  },
  {
    path: 'habit-statistics',
    loadChildren: () =>
      import('./pages/habit-statistics/habit-statistics.module').then(
        (m) => m.HabitStatisticsPageModule,
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
