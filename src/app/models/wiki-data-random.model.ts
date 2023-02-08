class RevisionsRandom {
  contentformat!: string;
  contentmodel!: string;
  '*'!: string;
}

export class WikiQueryDataRandom {
  pageid!: number;
  ns!: number;
  title!: string;
  revisions!: RevisionsRandom[];
}

class PageObjectRandom {
  [key: string]: WikiQueryDataRandom;
}

class WikiQueryObjectRandom {
  pages!: PageObjectRandom;
}

export class WikiDataRandom {
  batchcomplete!: string;
  continue!: any;
  warnings!: any;
  revisions!: any;
  query!: WikiQueryObjectRandom;
}

export class RandomWikiData {
  _title: string;
  _text: string;

  constructor(data: WikiQueryDataRandom) {
    this._title = data.title;
    this._text = data.revisions[0]['*'];
  }

  get wikiTitle() {
    return this._title;
  }

  get wikiText() {
    return this._text;
  }
}
