import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { StatsPageRoutingModule } from './stats-routing.module';
import { StatsPage } from './stats.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    StatsPageRoutingModule,
  ],
  declarations: [StatsPage],
})
export class StatsPageModule {}
