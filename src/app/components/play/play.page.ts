import { Component, OnInit } from '@angular/core';
import { WikiDataService } from 'src/app/services/wiki-data.service';

@Component({
  selector: 'app-play',
  templateUrl: 'play.page.html',
  styleUrls: ['play.page.scss'],
})
export class PlayPage implements OnInit {
  constructor(private wikiDataService: WikiDataService) {}
  ngOnInit(): void {
    console.log('ici');
    this.wikiDataService.getWikiDatasFromAPI();
  }
}
