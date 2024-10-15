import { ApiProperty } from "@nestjs/swagger";
import { CreateReviewRequest } from "../interfaces";

export class CreateReviewDto implements CreateReviewRequest {
    @ApiProperty({
        type: "string",
        required: true,
        example: "bu juda yaxshi kitob"
    })
    content: string;
}
