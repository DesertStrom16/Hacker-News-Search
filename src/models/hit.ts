class Hit {
  objectID: string;
  title: string;
  author: string;
  num_comments: number;
  created_at_i: number;

  constructor(
    objectID: string,
    title: string,
    author: string,
    num_comments: number,
    created_at_i: number
  ) {
    this.objectID = objectID;
    this.title = title;
    this.author = author;
    this.num_comments = num_comments;
    this.created_at_i = created_at_i;
  }
}

export default Hit;
