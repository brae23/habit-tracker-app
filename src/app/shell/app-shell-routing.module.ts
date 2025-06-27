import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppShellComponent } from './app-shell.component';

const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'daily-task-list',
        },
        {
            path: 'settings',
            loadChildren: () =>
            import('../pages/settings/settings.module').then(
                (m) => m.SettingsPageModule,
            ),
        },
        {
            path: 'lists-home',
            loadChildren: () =>
            import('../pages/lists-home/lists-home.module').then(
                (m) => m.ListsHomePageModule,
            ),
        },
        {
            path: 'daily-task-list',
            loadChildren: () =>
            import('../pages/daily-task-list/daily-task-list.module').then(
                (m) => m.DailyTaskListPageModule,
            ),
        },
        {
            path: 'user-profile',
            loadChildren: () =>
            import('../pages/user-profile/user-profile.module').then(
                (m) => m.UserProfilePageModule,
            ),
        },
        {
            path: 'habits',
            loadChildren: () =>
            import('../pages/habits/habits.module').then((m) => m.HabitsPageModule),
        },
        {
            path: 'habit-statistics',
            loadChildren: () =>
            import('../pages/habit-statistics/habit-statistics.module').then(
                (m) => m.HabitStatisticsPageModule,
            ),
        },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class AppShellRoutingModule {}
