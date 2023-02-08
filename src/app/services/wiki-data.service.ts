import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, take, tap } from 'rxjs';

import { WikiPopularResult } from '../models/wiki-data-popular.model';
import { WikiDataRandom } from '../models/wiki-data-random.model';
import { WikiSearchData } from '../models/wiki-data-search.model';

@Injectable({
  providedIn: 'root',
})
export class WikiDataService {
  private _loading$ = new BehaviorSubject<boolean>(false);
  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  private _wikiRandomData$ = new BehaviorSubject<WikiDataRandom | null>(null);
  get wikiRandomData$(): Observable<WikiDataRandom | null> {
    return this._wikiRandomData$.asObservable();
  }

  private _wikiPopularData$ = new BehaviorSubject<WikiPopularResult | null>(
    null
  );
  get wikiPopularData$(): Observable<WikiPopularResult | null> {
    return this._wikiPopularData$.asObservable();
  }

  private _wikiSearchData$ = new BehaviorSubject<WikiSearchData | null>(null);
  get wikiSearchData$(): Observable<WikiSearchData | null> {
    return this._wikiSearchData$.asObservable();
  }

  private baseUrl = 'https://fr.wikipedia.org/w/api.php';

  constructor(private http: HttpClient) {}

  getRandomWikiDatasFromAPI() {
    this.setLoadingStatus(true);
    const params = {
      action: 'query',
      format: 'json',
      generator: 'random',
      grnnamespace: 0,
      prop: 'revisions',
      rvprop: 'content',
      grnlimit: 5,
      origin: '*',
    };

    this.http
      .get<WikiDataRandom>(this.baseUrl, { params })
      .pipe(
        tap((values) => {
          this.setLoadingStatus(false);
          this._wikiRandomData$.next(values);
        }),
        take(1),
        catchError((err) =>
          of(false).pipe(
            tap((_) => {
              console.error(err);
              this.setLoadingStatus(false);
            })
          )
        )
      )
      .subscribe();
  }

  getPopularWikiSearchFromAPI() {
    this.setLoadingStatus(true);
    const params = {
      format: 'json',
      action: 'query',
      list: 'mostviewed',
      pvimlimit: 500,
      origin: '*',
    };

    this.http
      .get<WikiPopularResult>(this.baseUrl, { params })
      .pipe(
        tap((values) => {
          this.setLoadingStatus(false);
          this._wikiPopularData$.next(values);
        }),
        take(1),
        catchError((err) =>
          of(false).pipe(
            tap((_) => {
              console.error(err);
              this.setLoadingStatus(false);
            })
          )
        )
      )
      .subscribe();
  }

  getSearchWikiSearchFromAPI(search = 'wikipedia') {
    this.setLoadingStatus(true);
    const params = {
      origin: '*',
      format: 'json',
      action: 'parse',
      // prop: 'wikitext',
      page: search,
    };

    this.http
      .get<WikiSearchData>(this.baseUrl, { params })
      .pipe(
        tap((values) => {
          this.setLoadingStatus(false);
          this._wikiSearchData$.next(values);
        }),
        take(1),
        catchError((err) =>
          of(false).pipe(
            tap((_) => {
              console.error(err);
              this.setLoadingStatus(false);
            })
          )
        )
      )
      .subscribe();
  }

  private setLoadingStatus(loading: boolean) {
    this._loading$.next(loading);
  }
}
