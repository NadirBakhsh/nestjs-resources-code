import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreatePostDto } from "./createPost.dto";

export class PatchPostDto extends PartialType(CreatePostDto) {
    @ApiProperty({
        description: 'The ID of the post',
    })
    @IsInt()
    @IsNotEmpty()
    id: number;
}