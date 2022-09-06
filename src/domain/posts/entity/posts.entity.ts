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

  @Column({
    nullable: false,
    comment: '게시물 입력시 날씨 정보가 들어갑니다.',
  })
  weather?: string;

  public isDeleted() {
    this.deleteAt !== null;
  }

  public delete() {
    this.recordDeleteTime();
  }
}
