import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDTO } from './dto/createProduct.dto';
import { UpdateProductDTO } from './dto/updateProduct.dto';
import { postType } from './types/state.type';
import { ProductRepository } from './product.repository';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findProducts(body) {
    return await this.productRepository.findProducts(body);
  }

  // async findByTypeOfPost(typeOfPost: postType) {
  //   return await this.productRepository.findByTypeOfPost(typeOfPost);
  // }

  // async findByCategory(category: string) {
  //   return await this.productRepository.findByCategory(category);
  // }

  // async findProducts(user: string, typeOfPost: postType) {

  //   switch (typeOfPost) {
  //     case postType.lend:
  //       return await this.productRepository.findByLender(user);
  //     case postType.borrow:
  //       return await this.productRepository.findByBorrower(user);
  //   }
  // }

  async findOneProduct(id: string) {
    return await this.productRepository.findById(id);
  }

  // 게시물 생성
  async createProduct(createProduct: CreateProductDTO): Promise<Product> {
    const {
      postType,
      category,
      author,
      title,
      contents,
      imgUrl,
      lender,
      borrower,
      stateOfTransaction,
      address,
      price,
      period,
      hashtag,
      delivery,
      direct,
    } = createProduct;

    const inputProduct = {
      postType,
      category,
      author,
      title,
      contents,
      ...(imgUrl && { imgUrl }),
      ...(lender && { lender }),
      ...(borrower && { borrower }),
      stateOfTransaction,
      address,
      price,
      period,
      hashtag,
      delivery,
      direct,
    };
    const result = await this.productRepository.createProduct(inputProduct);
    return result.save();
  }

  // 게시물 수정
  async updateProduct(id: string, editproduct: UpdateProductDTO) {
    const {
      postType,
      category,
      author,
      title,
      contents,
      imgUrl,
      lender,
      borrower,
      stateOfTransaction,
      address,
      price,
      period,
      hashtag,
      delivery,
      direct,
    } = editproduct;

    const inputProduct = {
      ...(postType && { postType }),
      ...(category && { category }),
      ...(author && { author }),
      ...(title && { title }),
      ...(contents && { contents }),
      ...(imgUrl && { imgUrl }),
      ...(lender && { lender }),
      ...(borrower && { borrower }),
      ...(stateOfTransaction && { stateOfTransaction }),
      ...(address && { address }),
      ...(price && { price }),
      ...(period && { period }),
      ...(hashtag && { hashtag }),
      ...(delivery && { delivery }),
      ...(direct && { direct }),
    };
    const result = await this.productRepository.updateProduct(id, inputProduct);
    return result;
  }

  async deleteProduct(id: string) {
    return this.productRepository.deleteProduct(id);
  }
}
