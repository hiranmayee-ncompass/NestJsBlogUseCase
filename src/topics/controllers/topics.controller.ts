
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Request,
    Response,
    UseGuards
  } from '@nestjs/common';
import { CreateTopicDto } from '../dto/create-topics.dto';
import { TopicService } from '../services/topics.services';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

  
  @Controller('topic')
  export class TopicController {
    constructor(private readonly topicService: TopicService) {}

    @UseGuards(JwtAuthGuard)
    @Post("/create")
    create(@Body() createTopicDto : CreateTopicDto, @Request() req){
        const c = this.topicService.create(createTopicDto, req)
        return c;
    }
  }