import Hit from './hit';

class HitResult {
  hits: Hit[];
  nbPages: number;
  page: number;
  query: string;

  constructor(hits: Hit[], nbPages: number, page: number, query: string) {
    this.hits = hits;
    this.nbPages = nbPages;
    this.page = page;
    this.query = query;
  }
}

export default HitResult;
