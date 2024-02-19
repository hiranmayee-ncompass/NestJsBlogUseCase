// update-blog.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBlogDto {
    @IsNotEmpty()
    @IsString()
    blogName?: string;

    @IsNotEmpty()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsString()
    header?: string;

    @IsNotEmpty()
    @IsString()
    body?: string;

    @IsNotEmpty()
    @IsString()
    footer?: string;
}
