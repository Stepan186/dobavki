import { IsNumber, IsString, IsUUID } from 'class-validator';
import { uuid } from 'aws-sdk/clients/customerprofiles';

export class CreateReviewsDto {
  @IsString()
  description: string;

  @IsString()
  product: string;

  @IsString()
  user: string;
}
