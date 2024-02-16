import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { blogs } from '../entities/blog.entity';


@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(blogs)
        private readonly blogsRepository: Repository<blogs>){}
}
