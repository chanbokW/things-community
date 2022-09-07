import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { get } from 'http';
import { CreatePostsDto } from './dto/create-posts.dto';
import { DeletePostsDto } from './dto/delete-posts.dto';
import { PageRequest } from './dto/page-request.dto';
import { PostsResponse } from './dto/posts-response.dto';
import { UpdatePostsDto } from './dto/update-posts.dto';
import { PostsService } from './posts.service';

@ApiTags('게시판 API')
@Controller('api/v1/posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiOperation({
    summary: '게시물 등록 Api',
    description: '게시물을 등록한다.',
  })
  @ApiResponse({
    type: Number,
    status: HttpStatus.CREATED,
  })
  @Post()
  async create(@Body() createPosts: CreatePostsDto): Promise<number> {
    return await this.postsService.create(createPosts);
  }

  @ApiOperation({
    summary: '게시물 상세조회 Api',
    description: '게시물을 상세 조회한다.',
  })
  @ApiResponse({
    type: PostsResponse,
    status: HttpStatus.OK,
  })
  @ApiNotFoundResponse({ description: '존재하지 않은 게시물입니다.' })
  @Get(':id')
  findPosts(@Param('id', ParseIntPipe) id: number): Promise<PostsResponse> {
    return this.postsService.findById(id);
  }

  @ApiOperation({
    summary: '게시물 전체조회 - 페이징 Api',
    description: '게시물을 조회한다.',
  })
  @ApiResponse({
    type: [PostsResponse],
    status: HttpStatus.OK,
  })
  @ApiNotFoundResponse({ description: '게시글을 조회하지 못했습니다.' })
  @Get()
  findAll(@Query() pageRequest: PageRequest): Promise<PostsResponse[]> {
    return this.postsService.findAll(pageRequest.pageNo);
  }

  @ApiOperation({
    summary: '게시물 수정 Api',
    description: '게시물을 수정한다.',
  })
  @ApiResponse({
    type: PostsResponse,
    status: HttpStatus.OK,
  })
  @ApiForbiddenResponse({ description: '비밀번호가 일치하지 않습니다.' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostsDto: UpdatePostsDto,
  ): Promise<PostsResponse> {
    return this.postsService.update(id, updatePostsDto);
  }

  @ApiOperation({
    summary: '게시물 삭제 Api',
    description: '게시물을 삭제한다.',
  })
  @ApiForbiddenResponse({ description: '비밀번호가 일치하지 않습니다.' })
  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number,
    @Body() deletePostsDto: DeletePostsDto,
  ) {
    return this.postsService.remove(id, deletePostsDto);
  }
}
