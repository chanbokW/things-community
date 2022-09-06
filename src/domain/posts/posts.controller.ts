import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostsDto } from './dto/create-posts.dto';
import { PostsService } from './posts.service';

@Controller('api/v1/posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  async create(@Body() createPosts: CreatePostsDto): Promise<number> {
    return this.postsService.create(createPosts);
  }
}
