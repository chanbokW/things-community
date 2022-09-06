import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class UpdatePostsDto {
  @ApiProperty({
    example: '한글입니다.',
    description: '게시물 제목',
    required: true,
  })
  @IsNotEmpty()
  @Length(1, 50)
  title: string;

  @ApiProperty({
    example: '마바사아자차.',
    description: '게시물 본문',
    required: true,
  })
  @IsNotEmpty()
  @Length(1, 200)
  content: string;

  @ApiProperty({
    example: 'test2018.',
    description: '게시물 비밀번호',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*?[0-9]).{6,}$/, {
    message:
      '비밀번호는 6 자 이상이어야 하고, 숫자 1 개 이상 반드시 포함 되어야 합니다.',
  })
  password: string;

  constructor(title: string, content: string, password: string) {
    this.title = title;
    this.content = content;
    this.password = password;
  }
}
