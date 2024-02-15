// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from '../entities/topics.entity';
import { TopicService } from '../services/topics.services';
import { TopicController } from '../controllers/topics.controller';


@Module({
    imports: [TypeOrmModule.forFeature([Topic])],
    controllers: [TopicController],
    providers: [TopicService],
})
export class TopicModule {}
