import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { get } from 'http';
import { CreatePostsDto } from './dto/create-posts.dto';
import { DeletePostsDto } from './dto/delete-posts.dto';
import { PostsResponse } from './dto/posts-response.dto';
import { UpdatePostsDto } from './dto/update-posts.dto';
import { PostsService } from './posts.service';

@Controller('api/v1/posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  async create(@Body() createPosts: CreatePostsDto): Promise<number> {
    return await this.postsService.create(createPosts);
  }

  @Get(':id')
  findPosts(@Param('id') id: number): Promise<PostsResponse> {
    return this.postsService.findById(id);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updatePostsDto: UpdatePostsDto,
  ): Promise<PostsResponse> {
    return this.postsService.update(id, updatePostsDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Body() deletePostsDto: DeletePostsDto) {
    return this.postsService.remove(id, deletePostsDto);
  }
}
