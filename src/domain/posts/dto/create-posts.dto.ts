import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { Posts } from '../entity/posts.entity';

export class CreatePostsDto {
  @ApiProperty({
    example: '한글입니다.',
    description: '게시물 제목',
    required: true,
  })
  @IsNotEmpty()
  @Length(1, 20)
  private title: string;

  @ApiProperty({
    example: '가나다라마바사',
    description: '게시물 본문',
    required: true,
  })
  @IsNotEmpty()
  @Length(1, 200)
  private content: string;

  @ApiProperty({
    example: 'test2018',
    description: '게시물의 비밀번호',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*?[0-9]).{6,}$/, {
    message:
      '비밀번호는 6 자 이상이어야 하고, 숫자 1 개 이상 반드시 포함 되어야 합니다.',
  })
  private password: string;

  constructor(title: string, content: string, password: string) {
    this.title = title;
    this.content = content;
    this.password = password;
  }

  // 비번 암호화후 변환
  toEntity(password: string, weather: string): Posts {
    return Posts.create(this.title, this.content, password, weather);
  }

  get Password(): string {
    return this.password;
  }
}
