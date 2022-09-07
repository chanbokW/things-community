import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncModuleOptions } from 'src/global/config/typeorm.config';
import { Repository } from 'typeorm';
import { CreatePostsDto } from './dto/create-posts.dto';
import { Posts } from './entity/posts.entity';
import { PostsModule } from './posts.module';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  let postsRepository: Repository<Posts>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [PostsService],
    }).compile();

    postsService = module.get<PostsService>(PostsService);
  });

  // afterEach(async () => {
  //   postsRepository.delete({});
  // });

  // afterAll(async () => {
  //   postsRepository.delete({});
  // });
});
