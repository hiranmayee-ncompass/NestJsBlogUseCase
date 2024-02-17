// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from '../entities/topics.entity';
import { TopicService } from '../services/topics.services';
import { TopicController } from '../controllers/topics.controller';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { AssignViewer } from '../entities/assign-viewer.entity';
import { AssignEditor } from '../entities/assign-editor.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Topic, AssignViewer, AssignEditor])],
    controllers: [TopicController],
    providers: [TopicService, JwtStrategy],
})
export class TopicModule {}
