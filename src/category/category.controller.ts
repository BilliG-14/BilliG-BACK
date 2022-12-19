import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/createCategory.dto';
import { Category } from './schemas/category.schema';

@Controller('category')
export class CategoryController {
  constructor(readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Post()
  async addCategory(@Body() body: CreateCategoryDTO) {
    const { name } = body;
    return this.categoryService.addCategory(name);
  }

  @Patch('/:id')
  async editCategory(
    @Param('id') _id: string,
    @Body() body: CreateCategoryDTO,
  ) {
    const { name } = body;
    return this.categoryService.editCategory(_id, name);
  }

  @Delete('/:id')
  async deleteCategory(@Param('id') _id: string) {
    return this.categoryService.deleteCategory(_id);
  }
}
