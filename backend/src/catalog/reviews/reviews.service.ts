import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Review } from './review.entity';
import { CreateReviewsDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: EntityRepository<Review>,
  ) {
  }

  async createReview(dto: CreateReviewsDto) {
    const review = this.reviewsRepository.create(dto);
    await this.reviewsRepository.persistAndFlush(review);
    return review;
  }

  async getReview(reviewId: number) {
    return await this.reviewsRepository.findOne(reviewId);
  }

  async getReviews() {
    return await this.reviewsRepository.findAll();
  }

  async deleteReview(reviewId: number) {
    await this.reviewsRepository.nativeDelete({ id: reviewId });
  }

  async updateReview(reviewId: number, dto: UpdateReviewDto) {
    const review = await this.reviewsRepository.findOne(reviewId);
    review.assign(dto);
    await this.reviewsRepository.flush();
    return review;
  }
}
