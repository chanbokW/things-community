import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostsDto } from './dto/create-posts.dto';
import { Posts } from './entity/posts.entity';
import * as bcrypt from 'bcrypt';
import { PostsResponse } from './dto/posts-response.dto';
import { UpdatePostsDto } from './dto/update-posts.dto';
import { DeletePostsDto } from './dto/delete-posts.dto';

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

  /**
   *
   * @param id 게시글 아이디
   * @returns 게시글 상세정보
   */
  async findById(id: number): Promise<PostsResponse> {
    const posts: Posts = await this.postsRepository.findOneBy({ id });
    return PostsResponse.of(posts);
  }

  async findAll() {
    const postsList: Posts[] = await this.postsRepository.find();
    return postsList;
  }

  /**
   * @param id 게시글 아이디
   *
   */
  async update(
    id: number,
    updatePostsDto: UpdatePostsDto,
  ): Promise<PostsResponse> {
    const { title, content, password } = updatePostsDto;
    const findPosts: Posts = await this.postsRepository.findOneBy({ id });
    if (!findPosts || findPosts.isDeleted()) {
      throw new HttpException(
        '존재하지 않은 게시물입니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    if (!(await bcrypt.compare(password, findPosts.password))) {
      throw new HttpException(
        '비밀번호 보가 일치하지 않습니다.',
        HttpStatus.FORBIDDEN,
      );
    }

    findPosts.update(title, content);
    await this.postsRepository.update(id, findPosts);
    return PostsResponse.of(findPosts);
  }
}
