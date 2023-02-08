import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SafeHtmlPipe } from 'src/app/Pipes/SafeHtml.pipe';

import { WikiDataService } from '../../services/wiki-data.service';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { PlayPageRoutingModule } from './play-routing.module';
import { PlayPage } from './play.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    PlayPageRoutingModule,
  ],
  declarations: [PlayPage, SafeHtmlPipe],
  exports: [SafeHtmlPipe],
  providers: [WikiDataService],
})
export class PlayPageModule {}
