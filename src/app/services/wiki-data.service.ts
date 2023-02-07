import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, take, tap } from 'rxjs';

import { WikiData } from '../models/wiki-data.model';

const errorJSON = [
  {
    pageid: 5620949,
    ns: 0,
    title: 'Wikan-find-it',
    revisions: [
      {
        contentformat: 'text/x-wiki',
        contentmodel: 'wikitext',
        '*': 'Jeu ',
      },
    ],
  },
];

@Injectable({
  providedIn: 'root',
})
export class WikiDataService {
  private wikiData: WikiData[] = [];
  private baseUrl = 'https://fr.wikipedia.org/w/api.php';

  private headersConfig = {};
  constructor(private http: HttpClient) {}

  getWikiDatasFromAPI() {
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
      .get(this.baseUrl, { params })
      .pipe(
        tap((values) => {
          console.log(values);
        }),
        take(1),
        catchError((err) =>
          of(false).pipe(
            tap((error) => {
              console.log(err);
              this.wikiData = errorJSON;
            })
          )
        )
      )
      .subscribe();
  }
}
