import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListsHomePageRoutingModule } from './lists-home-routing.module';

import { ListsHomePage } from './lists-home.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListsHomePageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ListsHomePage],
})
export class ListsHomePageModule {}
