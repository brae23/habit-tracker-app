import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppShellPageRoutingModule } from './app-shell-routing.module';

import { AppShellPage } from './app-shell.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppShellPageRoutingModule
  ],
  declarations: [AppShellPage]
})
export class AppShellPageModule {}
