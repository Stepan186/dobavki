import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewsDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {
  }

  @Post()
  create(@Body() dto: CreateReviewsDto) {
    return this.reviewsService.createReview(dto);
  }

  @Get(':id')
  getOne(@Param() id: number) {
    return this.reviewsService.getReview(id);
  }

  @Get()
  getAll() {
    return this.reviewsService.getReviews();
  }

  @Delete(':id')
  delete(@Param() id: number) {
    return this.reviewsService.deleteReview(id);
  }

  @Patch(':id')
  update(@Param() id: number, @Body() dto: UpdateReviewDto) {
    return this.reviewsService.updateReview(id, dto);
  }
}
