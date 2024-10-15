import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './entity';
import { CreateReviewRequest } from './interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(@InjectRepository(Review) private reviewModel: Repository<Review>){}
  async create(payload: CreateReviewRequest): Promise<Review> {
    // console.log(payload, "*")
    const review = await this.reviewModel.create({
      content: payload.content,
    });
    return this.reviewModel.save(review)
  }

  async findAll() {
    const allReviews = await this.reviewModel.find()
    // console.log(allReviews)
    return allReviews;
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewModel.findOneBy({id})
    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<string> {
    await this.reviewModel.update({id}, {
      content: updateReviewDto.content
    })
    return `This action updates a #${id} review`;
  }

  async remove(id: number) {
    await this.reviewModel.delete({id})
    return `This action removes a #${id} review`;
  }
}
