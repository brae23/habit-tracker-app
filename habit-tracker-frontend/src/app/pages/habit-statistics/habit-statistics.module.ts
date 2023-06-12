import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HabitStatisticsPageRoutingModule } from './habit-statistics-routing.module';

import { HabitStatisticsPage } from './habit-statistics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HabitStatisticsPageRoutingModule
  ],
  declarations: [HabitStatisticsPage]
})
export class HabitStatisticsPageModule {}
