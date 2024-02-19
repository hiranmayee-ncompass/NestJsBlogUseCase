import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from '../entities/blog.entity';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { UpdateBlogDto } from '../dto/update-blog.dto';
import { AssignEditor } from 'src/topics/entities/assign-editor.entity';
import { AssignViewer } from 'src/topics/entities/assign-viewer.entity';



@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog)
        private readonly blogRepository: Repository<Blog>,
        @InjectRepository(AssignEditor)
        private readonly assignEditorRepository: Repository<AssignEditor>,
        @InjectRepository(AssignViewer)
        private readonly assignViewerRepository: Repository<AssignViewer>
    ) {}

    async create(createBlogDto: CreateBlogDto, req){
        try{
            const loggedInUserInfo = req.user;
            
            const {blogName, description, header, body, footer, topicId} = createBlogDto;
            const assignedEditor = await this.assignEditorRepository.findOne({
                where: { topicId: topicId, userId: loggedInUserInfo.userid }
            });
            if (!assignedEditor) {
                throw new UnauthorizedException('User is not authorized to create a blog for this topic');
            }
            const ownerId = loggedInUserInfo.userid;
            const blogData = {
                blogName: blogName,
                description: description,
                ownerId: ownerId,
                header: header,
                body: body,
                footer: footer,
                topicId: topicId
            }
            return this.blogRepository.insert(blogData);
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

    async findAll(req) {
        try {
            const loggedInUserInfo = req.user;
    
            const assignedViewers = await this.assignViewerRepository.find({
                where: { userId: loggedInUserInfo.userid }
            });
    
            
            // Extract the topic IDs from the assigned viewers
            const topicIds = assignedViewers.map(viewer => viewer.topicId);      
                  
            
            // Retrieve the blogs related to the topics assigned to the user as a viewer
            
            return  await this.blogRepository.find({
                where: { topicId: In(topicIds) }
            });

        } catch (error) {
            throw new NotFoundException('You are not allowed');
        }
    }
}
