import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from '../entities/blog.entity';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { UpdateBlogDto } from '../dto/update-blog.dto';



@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog)
        private readonly blogRepository: Repository<Blog>
    ) {}

    async create(createBlogDto: CreateBlogDto, req){
        try{
            const loggedInUserInfo = req.user;
            const {blogName, description, header, body, footer, topicId} = createBlogDto;
            if(loggedInUserInfo.roleid == 4){
                const ownerId = loggedInUserInfo.userid;
                const value = {
                    blogName: blogName,
                    description: description,
                    ownerId: ownerId,
                    header: header,
                    body: body,
                    footer: footer,
                    topicId: topicId
                }
                return this.blogRepository.insert(value)
            } else{
                throw new UnauthorizedException('No authorisaion')
            }
        } catch(error){
            throw new NotFoundException('You are not allowed')
        }
    }

    async update(updateBlogDto: UpdateBlogDto, req) {
        try {
            const loggedInUserInfo = req.user;
            const blog = await this.blogRepository.findOne({
                where: { ownerId: loggedInUserInfo.userid },
            });

            if (!blog) {
                throw new NotFoundException('Blog not found');
            }

            await this.blogRepository.update(blog.blogId, updateBlogDto);
            return await this.blogRepository.findOne({
                where: { blogId: blog.blogId },
            });
        } catch (error) {
            throw new NotFoundException('You are not allowed');
        }
    }

    async delete(blogId:number, req){
        try{
            const loggedInUserInfo = req.user;
            const blog = await this.blogRepository.findOne({
                where: { blogId: blogId, ownerId: loggedInUserInfo.userid },
            });
            if (!blog) {
                throw new NotFoundException('Blog not found');
            }
    
            await this.blogRepository.delete(blogId);
            return { message: 'Blog deleted successfully' };
        }catch (error) {
            throw new NotFoundException('You are not allowed');
        }
    }

    async findAll() {
        return this.blogRepository.find();
    }
}
