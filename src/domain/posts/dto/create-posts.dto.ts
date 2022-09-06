import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { Posts } from '../entity/posts.entity';

export class CreatePostsDto {
  @IsNotEmpty()
  @Length(1, 50)
  private title: string;

  @IsNotEmpty()
  @Length(1, 200)
  private content: string;

  @IsString()
  @IsNotEmpty()
  @Matches('^(?=.*?[0-9]).{6,}$')
  private password: string;

  constructor(title: string, content: string, password: string) {
    this.title = title;
    this.content = content;
    this.password = password;
  }

  // 비번 암호화후 변환
  toEntity(password: string): Posts {
    return Posts.create(this.title, this.content, password);
  }

  get Password(): string {
    return this.password;
  }
}
