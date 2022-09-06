import { Posts } from '../entity/posts.entity';

export class PostsResponse {
  id: number;
  title: string;
  content: string;
  createAt: Date;
  updateAt: Date;

  constructor(
    id: number,
    title: string,
    content: string,
    createAt: Date,
    updateAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createAt = createAt;
    this.updateAt = updateAt;
  }

  static of(posts: Posts): PostsResponse {
    return new PostsResponse(
      posts.id,
      posts.content,
      posts.content,
      posts.createAt,
      posts.updateAt,
    );
  }
}
