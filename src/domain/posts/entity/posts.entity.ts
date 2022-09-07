import { BaseTimeEntity } from 'src/global/common/BaseTimeEntity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Posts extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 20,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  content: string;

  @Column()
  password: string;

  @Column({
    comment: '게시물을 입력하면 날씨정보가 추가됩니다.',
    nullable: true, // 일단 true로
  })
  weather: string;

  static create(
    title: string,
    content: string,
    password: string,
    weather: string,
  ): Posts {
    const posts = new Posts();
    posts.title = title;
    posts.content = content;
    posts.password = password;
    posts.weather = weather;
    return posts;
  }

  public isDeleted(): boolean {
    return this.deleteAt !== null;
  }

  public update(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
  public delete() {
    this.recordDeleteTime();
  }
}
