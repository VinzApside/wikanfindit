import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { filter, map, Observable, tap } from 'rxjs';
import { WikiPopularResult } from 'src/app/models/wiki-data-popular.model';
import { RandomWikiData, WikiDataRandom } from 'src/app/models/wiki-data-random.model';
import { SearchWikiData } from 'src/app/models/wiki-data-search.model';
import { WikiDataService } from 'src/app/services/wiki-data.service';

@Component({
  selector: 'app-play',
  templateUrl: 'play.page.html',
  styleUrls: ['play.page.scss'],
})
export class PlayPage implements OnInit {
  loading$!: Observable<boolean>;
  wikiData$!: Observable<WikiDataRandom[]>;

  wikiText!: string | undefined;
  wikiTitle!: string | undefined;

  constructor(
    private wikiDataService: WikiDataService,
    private loadingCtrl: LoadingController
  ) {}
  loading!: any;

  async ngOnInit(): Promise<void> {
    this.initObservables();
    this.wikiDataService.getRandomWikiDatasFromAPI();
    this.wikiDataService.getPopularWikiSearchFromAPI();
    this.loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 3000,
      spinner: 'circles',
    });
  }

  async showLoading() {
    this.loading.present();
  }

  private initObservables() {
    this.loading$ = this.wikiDataService.loading$;

    this.wikiDataService.wikiRandomData$
      .pipe(
        filter((wikiData) => !!wikiData),
        map((wikidata) => {
          return this.getWikiRandomPage(wikidata);
        })
      )
      .subscribe();

    this.wikiDataService.wikiPopularData$
      .pipe(
        filter((wikiData) => !!wikiData),
        tap((wikidata) => {
          this.getSpecificRandomPage(wikidata);
        })
      )
      .subscribe();

    this.wikiDataService.wikiSearchData$
      .pipe(
        filter((wikiData) => !!wikiData),
        map((wikidata) => {
          if (wikidata) {
            return new SearchWikiData(wikidata);
          }
          return;
        })
      )
      .subscribe((val) => {
        console.log(val?.clearedText);

        // this.wikiText = val?.clearedText;
        this.wikiText = val?.wikiText;
        this.wikiTitle = val?.wikiTitle;
      });
  }

  getWikiRandomPage(wikidata: WikiDataRandom | null) {
    const wikiResult = wikidata?.query?.pages;
    if (wikiResult) {
      let wikiResults = [];
      for (const key in wikiResult) {
        if (Object.prototype.hasOwnProperty.call(wikiResult, key)) {
          const element = wikiResult[key];
          wikiResults.push(new RandomWikiData(element));
        }
      }
      if (wikiResults.length) {
        const randomNumber = this.getRandomNumber(wikiResults.length);
        return wikiResults[randomNumber];
      }
    }
    return;
  }

  getRandomNumber(max = 500) {
    return Math.floor(Math.random() * (max - 1) + 1);
  }

  getSpecificRandomPage(data: WikiPopularResult | null): void {
    const mostViewed = data?.query?.mostviewed;

    if (!!mostViewed) {
      const randomNumber = this.getRandomNumber(mostViewed?.length);
      const randomView = mostViewed[randomNumber];
      this.wikiDataService.getSearchWikiSearchFromAPI(randomView?.title);
    }
  }
}
