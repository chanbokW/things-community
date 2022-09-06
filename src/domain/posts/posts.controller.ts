import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { get } from 'http';
import { CreatePostsDto } from './dto/create-posts.dto';
import { PostsResponse } from './dto/posts-response.dto';
import { PostsService } from './posts.service';

@Controller('api/v1/posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  async create(@Body() createPosts: CreatePostsDto): Promise<number> {
    return await this.postsService.create(createPosts);
  }

  @Get(':id')
  findPosts(@Param() id: number): Promise<PostsResponse> {
    return this.postsService.findById(id);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }
}
