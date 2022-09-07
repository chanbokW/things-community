import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

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
