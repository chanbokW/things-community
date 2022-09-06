import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncModuleOptions } from './global/config/typeorm.config';
import { PostsModule } from './domain/posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncModuleOptions),
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
    }),
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
