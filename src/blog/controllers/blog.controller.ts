import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Patch,
    Param,
    Delete,
    Request,
    Response,
    UseGuards
  } from '@nestjs/common';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BlogService } from '../services/blog.service';
import { UpdateBlogDto } from '../dto/update-blog.dto';


@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService){}

    @UseGuards(JwtAuthGuard)
    @Post("/create")
    create(@Body() createBlogDto : CreateBlogDto, @Request() req){
        return this.blogService.create(createBlogDto, req)
         
    }
    @UseGuards(JwtAuthGuard)
    @Put("/update")
    update(@Body() updateBlogDto : UpdateBlogDto, @Request() req){
        return this.blogService.update(updateBlogDto, req)
    }
    @UseGuards(JwtAuthGuard)
    @Delete("/delete")
    async delete(@Body('blogId') blogId: number, @Request() req) {
        return this.blogService.delete(blogId, req);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/all")
    async findAll(@Request() req) {
        return this.blogService.findAll(req);
    }
}
