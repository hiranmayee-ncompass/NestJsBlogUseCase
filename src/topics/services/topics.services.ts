import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { QueryFailedError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from '../entities/topics.entity';
import { CreateTopicDto } from '../dto/create-topics.dto';
import { AssignViewerDto } from '../dto/assign-viewer.dto';
import { AssignViewer } from '../entities/assign-viewer.entity';
import { AssignEditorDto } from '../dto/assign-editor.dto';
import { AssignEditor } from '../entities/assign-editor.entity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,

    @InjectRepository(AssignViewer)
    private readonly assignViewerRepository: Repository<AssignViewer>,

    @InjectRepository(AssignEditor)
    private readonly assignEditorRepository: Repository<AssignEditor>,
  ) {}

  create(createTopicDto: CreateTopicDto, req) {
    try {
      const loggedInUserInfo = req.user;
      const { topicName, description } = createTopicDto;
      if (loggedInUserInfo.roleid == 1 || loggedInUserInfo.roleid == 2) {
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
      throw error
    }
  }

  async assignViewer(assignViewerDto: AssignViewerDto, req){
    try {
      const isUserAuthorized = await this.authorizingUser(assignViewerDto, req)
      if(isUserAuthorized)
        return this.assignViewerRepository.save(assignViewerDto)
    }catch (error) {
      throw error
    }
  }

  async assignEditor(assignEditorDto: AssignEditorDto, req){
    try {
      const isUserAuthorized = await this.authorizingUser(assignEditorDto, req)
      if(isUserAuthorized)
        return this.assignEditorRepository.save(assignEditorDto)

    }catch (error) {
        throw error
    }
  }

  async authorizingUser(dto: AssignViewerDto | AssignEditorDto, req){
    const loggedInUserInfo = req.user;
      console.log(loggedInUserInfo)
      const {topicId} = dto;

      if(loggedInUserInfo.roleid != 1 && loggedInUserInfo.roleid != 2){
        throw new UnauthorizedException("You cant assign viewer")
      }

      const loggedUserId = loggedInUserInfo.userid;
      const result = await this.topicRepository
                          .createQueryBuilder('topic')
                          .select('ownerId')
                          .where('topicId = :topicId', { topicId })
                          .getRawOne();

      if(loggedUserId != result.ownerId){
        throw new UnauthorizedException("You cant assign viewer")
      }
      return true;
  }



  

  
}
