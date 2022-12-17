import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly CategoryRepository: CategoryRepository) {}

  async getAllCategories() {
    return await this.CategoryRepository.findAllCategories();
  }

  async addCategory(name: string) {
    return await this.CategoryRepository.addCategory(name);
  }

  async editCategory(_id: string, newName: string) {
    return await this.CategoryRepository.editCategory(_id, newName);
  }

  async deleteCategory(_id: string) {
    return await this.CategoryRepository.deleteCategory(_id);
  }
}
