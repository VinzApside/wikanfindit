interface Wikitext {
  '*': string;
}

interface Parse {
  title: string;
  pageid: number;
  text: Wikitext;
}

export interface WikiSearchData {
  parse: Parse;
}

export class SearchWikiData {
  _title: string = '';
  _text: string = '';
  _clearedText: string = '';

  constructor(data: WikiSearchData) {
    this._title = data.parse.title;
    this._text = data.parse.text['*'];
    this.getAllWords();
  }

  get wikiTitle(): string {
    return this._title;
  }

  get wikiText(): string {
    this.removeTag();
    return this._text;
  }

  get clearedText(): string {
    this.removeWord();
    return this._clearedText;
  }

  removeTag() {
    let text = this._text;
    text = text.replace(/<a(.|\n)*?>/gim, '');
    text = text.replace(/<\/a>/gim, '');
    text = text.replace(/\[(.|\n)*?\]/gim, '');
    text = text.replace(/<img[^>]*>/gim, '');
    text = text.replace(/<audio[^>]*audio>/gim, '');
    this._text = text;
  }

  removeWord() {
    this.removeTag();
    this._clearedText = this._text;
    this._clearedText = this._clearedText.replace(
      />[\w,\d,\s,\.,\;,\(,\)]+</gim,
      '>...<'
    );
    this._clearedText = this._clearedText.replace(
      />"[\w,\d,\s,\.,\;,\(,\)]+"</gim,
      '>...<'
    );
  }

  getAllWords() {
    let removetags = this._text
      .replace(/(\r\n|\n|\r)/gm, '')
      .replace('\\[|\\]', '')
      .replace('\\(|\\)', '')
      .replace(/<(.|\n)*?>/gim, ' ')
      .replace(/<\/(.|\n)*?>/gim, ' ')
      .replace(/&(.|\n)*?;/g, ' ')
      .replace(/\[(.|\n)*?\[/g, '')
      .replace(/[\.|\,|\\|\;| \(| \)| \\n| \"| \']+/, '');

    let wordsArray = removetags.split(' ');
    wordsArray = [...new Set(wordsArray)];
    console.log('+++++', wordsArray);
  }
}
