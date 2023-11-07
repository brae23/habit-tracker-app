import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HabitStatisticsPageRoutingModule } from './habit-statistics-routing.module';

import { HabitStatisticsPage } from './habit-statistics.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HabitStatisticsPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [HabitStatisticsPage],
})
export class HabitStatisticsPageModule {}
