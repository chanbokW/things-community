import { ApiProperty } from '@nestjs/swagger';

export class PageRequest {
  @ApiProperty({
    default: 1,
    description: '페이지 번호 ',
  })
  pageNo?: number = 1;
}
