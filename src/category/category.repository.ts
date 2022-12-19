import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name)
    private readonly categotyModel: Model<CategoryDocument>,
  ) {}

  async findAllCategories() {
    return this.categotyModel.find({});
  }

  async addCategory(name: string) {
    return this.categotyModel.create({ name });
  }

  async editCategory(_id: string, newName: string) {
    return this.categotyModel.findOneAndUpdate({ _id: _id }, { name: newName });
  }

  async deleteCategory(_id: string) {
    return this.categotyModel.findOneAndDelete({ _id: _id });
  }
}
