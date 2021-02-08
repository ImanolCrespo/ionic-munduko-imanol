import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ActivitydbService } from '../core/activitydb.service';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    HomePageRoutingModule,
    IonicStorageModule.forRoot(),
    ReactiveFormsModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
