import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categotyModel: Model<CategoryDocument>,
  ) {}

  async getAllCategories() {
    return await this.categotyModel.find({});
  }

  async addCategory(name: string) {
    return await this.categotyModel.create({ name });
  }

  async editCategory(_id: string, newName: string) {
    return await this.categotyModel.findOneAndUpdate(
      { _id: _id },
      { name: newName },
    );
  }

  async deleteCategory(_id: string) {
    return await this.categotyModel.findOneAndDelete({ _id: _id });
  }
}
