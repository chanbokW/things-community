import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const typeOrmAsyncModuleOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    autoLoadEntities: true,
    logging: true,
    charset: 'utf8mb4',
  }),
};
