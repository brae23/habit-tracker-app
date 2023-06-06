import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListsHomePageRoutingModule } from './lists-home-routing.module';

import { ListsHomePage } from './lists-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListsHomePageRoutingModule
  ],
  declarations: [ListsHomePage]
})
export class ListsHomePageModule {}
