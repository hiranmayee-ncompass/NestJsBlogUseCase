import { Module } from '@nestjs/common';
import { BlogController } from '../controllers/blog.controller';

@Module({
  controllers: [BlogController]
})
export class BlogModule {}
