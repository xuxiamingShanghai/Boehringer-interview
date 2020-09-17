import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskRoutingModule } from './task-routing.module';

import { TaskComponent } from './task.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskRoutingModule
  ],
  declarations: [TaskComponent]
})
export class TaskModule {}
