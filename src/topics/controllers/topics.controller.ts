
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
import { AuthGuard } from '@nestjs/passport';
import { AssignViewerDto } from '../dto/assign-viewer.dto';
import { AssignEditorDto } from '../dto/assign-editor.dto';

  
  @Controller('topic')
  export class TopicController {
    constructor(private readonly topicService: TopicService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post("/create")
    create(@Body() createTopicDto : CreateTopicDto, @Request() req){
        return this.topicService.create(createTopicDto, req)
    }

    @UseGuards(JwtAuthGuard)
    @Post("/assign-viewer")
    assignViewer(@Body() assignViewerDto:AssignViewerDto, @Request() req){
      return this.topicService.assignViewer(assignViewerDto, req)
    }


    @UseGuards(JwtAuthGuard)
    @Post("/assign-editor")
    assignEditor(@Body() assignEditorDto:AssignEditorDto, @Request() req){
      return this.topicService.assignEditor(assignEditorDto, req)
    }
  }