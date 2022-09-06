import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostsDto } from './dto/create-posts.dto';
import { Posts } from './entity/posts.entity';
import * as bcrypt from 'bcrypt';
import { PostsResponse } from './dto/posts-response.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postsRepository: Repository<Posts>,
  ) {}
  /**
   *
   * @param createPostsDto 게시글 생성
   * @returns 게시글 생성 번호
   */
  async create(createPostsDto: CreatePostsDto): Promise<number> {
    const password = createPostsDto.Password;
    // 비밀번호 암호화
    const hashpassword = await bcrypt.hash(password, 10);

    const saveposts = await this.postsRepository.save(
      createPostsDto.toEntity(hashpassword),
    );

    return saveposts.id;
  }
}
