import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from '../entities/topics.entity';
import { CreateTopicDto } from '../dto/create-topics.dto';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}

  create(createTopicDto: CreateTopicDto, req) {
    //return req.headers['authorization'];
    try {
      const loggedInUserInfo = req.user;
      const { topicName, description } = createTopicDto;
      if (loggedInUserInfo.role == 1 || loggedInUserInfo.role == 2) {
        const ownerId = loggedInUserInfo.userid;
        const value = {
          topicName: topicName,
          description: description,
          ownerId: ownerId,
        };
        return this.topicRepository.insert(value);
      } else {
        throw new UnauthorizedException('You are not allowed to create');
      }
    } catch (error) {
      throw new NotFoundException('You are not allowed to create');
    }
  }
}
