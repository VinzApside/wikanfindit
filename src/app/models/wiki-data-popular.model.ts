interface Continue {
  pvimoffset: number;
  continue: string;
}

interface Mostviewed {
  ns: number;
  title: string;
  count: number;
}

interface Query {
  mostviewed: Mostviewed[];
}

export interface WikiPopularResult {
  batchcomplete: string;
  continue: Continue;
  query: Query;
}
