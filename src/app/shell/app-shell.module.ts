import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AppShellComponent } from './app-shell.component';
import { AppShellRoutingModule } from './app-shell-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppShellComponent],
  imports: [
    CommonModule,
    AppShellRoutingModule,
    HttpClientModule,
    IonicModule
  ]
})
export class AppShellModule {}
