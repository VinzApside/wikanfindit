class Revisions {
  contentformat!: string;
  contentmodel!: string;
  '*'!: string;
}

export class WikiData {
  pageid!: number;
  ns!: number;
  title!: string;
  revisions!: Revisions[];
}
