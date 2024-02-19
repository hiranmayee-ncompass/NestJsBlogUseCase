import { Module } from '@nestjs/common';
import { BlogController } from '../controllers/blog.controller';
import { Blog } from '../entities/blog.entity';
import { BlogService } from '../services/blog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { TopicModule } from 'src/topics/modules/topics.modules';
import { AssignEditor } from 'src/topics/entities/assign-editor.entity';
import { AssignViewer } from 'src/topics/entities/assign-viewer.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Blog, AssignEditor, AssignViewer])],
  controllers: [BlogController],
  providers: [BlogService, JwtStrategy]
})
export class BlogModule {}
