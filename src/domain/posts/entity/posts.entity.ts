import { BaseTimeEntity } from 'src/global/common/BaseTimeEntity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Posts extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  password: string;

  static create(title: string, content: string, password: string): Posts {
    const posts = new Posts();
    posts.title = title;
    posts.content = content;
    posts.password = password;
    return posts;
  }

  public isDeleted() {
    this.deleteAt !== null;
  }

  public update(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
  public delete() {
    this.recordDeleteTime();
  }
}
